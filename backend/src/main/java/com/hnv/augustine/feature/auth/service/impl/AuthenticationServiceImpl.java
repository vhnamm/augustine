package com.hnv.augustine.feature.auth.service.impl;

import com.hnv.augustine.common.exception.AppException;
import com.hnv.augustine.common.exception.ErrorCode;
import com.hnv.augustine.common.redis.RedisService;
import com.hnv.augustine.feature.auth.dto.*;
import com.hnv.augustine.feature.auth.entity.RefreshToken;
import com.hnv.augustine.feature.auth.service.AuthenticationService;
import com.hnv.augustine.feature.auth.service.OtpService;
import com.hnv.augustine.feature.auth.service.RefreshTokenService;
import com.hnv.augustine.feature.auth.service.TokenBlacklistService;
import com.hnv.augustine.feature.user.entity.Role;
import com.hnv.augustine.feature.user.entity.User;
import com.hnv.augustine.feature.user.mapper.UserMapper;
import com.hnv.augustine.feature.user.repository.RoleRepository;
import com.hnv.augustine.feature.user.repository.UserRepository;
import com.hnv.augustine.security.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserMapper userMapper;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenService refreshTokenService;
    private final TokenBlacklistService tokenBlacklistService;
    private final PasswordEncoder passwordEncoder;
    private final RedisService redisService;
    private final OtpService otpService;

    @Value("${otp.expiration}")
    private Long PENDING_USER_TTL;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest loginRequest, String clientIp, String userAgent) {
        log.info("Login Request: {}", loginRequest);
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow((
                ) -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (!user.isAccountNonLocked()) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }

        if (user.getPassword() == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(
                user, null, user.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtProvider.generateJwtToken(user);

        String refreshToken = refreshTokenService.create(user, clientIp, userAgent);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    @Transactional
    public void register(RegisterRequest registerRequest){

        log.info("Register Request: {}", registerRequest);
        if(userRepository.existsByEmail(registerRequest.getEmail())){ //ko write nen ko bi concurency
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        String password = passwordEncoder.encode(registerRequest.getPassword());

        PendingRegistrationDto pendingRegistration = PendingRegistrationDto
                .builder()
                .email(registerRequest.getEmail())
                .passwordHash(password)
                .fullName(registerRequest.getFullName())
                .build();

        redisService.set("auth:pending-regis:" + registerRequest.getEmail(),
                pendingRegistration,
                Duration.ofMillis(PENDING_USER_TTL)
        );

        otpService.generateAndSendOTP(registerRequest.getEmail(), "Xác thực đăng ký tài khoản Augustine");
    }

    @Transactional
    public User processGoogleLogin(String email, String fullName, String imgUrl, String googleId){
        //check xem da tao tk nao bang email nay ma chua lien ket google ko
        var opt = userRepository.findByEmail(email);
        if(opt.isPresent()){
            //neu chua co google id
            User user = opt.get();
            if(user.getGoogleId() == null){
                user.setGoogleId(googleId);
                return userRepository.save(user);
            }
            return  user;
        }

        Role r = roleRepository.findByName("USER").orElseThrow(() -> new AppException(ErrorCode.USER_ALREADY_EXISTS));
        User user = User.builder()
                .googleId(googleId)
                .fullName(fullName)
                .avatar(imgUrl)
                .email(email)
                .role(r)
                .build();

        return userRepository.save(user);
    }

    @Transactional
    @Override
    public RegisterResponse confirm(ConfirmationRequest confirmationRequest){
        otpService.verifyOTP(confirmationRequest.getEmail(), confirmationRequest.getOtp());

        String key = "auth:pending-regis:" + confirmationRequest.getEmail();
        PendingRegistrationDto pendingRegistration = redisService.get(key, PendingRegistrationDto.class);
        if(pendingRegistration == null){
            throw new AppException(ErrorCode.PENDING_REGIS_NOT_FOUND);
        }

        Role r = roleRepository.findByName("USER").orElseThrow(() -> new AppException(ErrorCode.ROLE_NOTFOUND));
        User user = User.builder()
                .email(pendingRegistration.getEmail())
                .role(r)
                .password(pendingRegistration.getPasswordHash())
                .fullName(pendingRegistration.getFullName())
                .build();

        //tranh concurency
        try{
            userRepository.save(user);
            return userMapper.toRegisterResponse(user);
        }catch (DataIntegrityViolationException e){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }finally {
            redisService.delete(key);
        }
    }

    @Override
    @Transactional
    public void logout(String accessToken, String refreshToken) {
        log.info("Logout Request");
        if(accessToken != null && !accessToken.isEmpty()){
            try{
                Claims claims = jwtProvider.parseClaims(accessToken);
                String jti = (String) claims.get("jti");
                // cho vao blacklist
                Instant expTime = claims.getExpiration().toInstant();
                tokenBlacklistService.blacklist(jti, expTime);

            }catch (ExpiredJwtException expiredJwtException){

            }catch (JwtException jwtException){

            }
        }
        //revoke
        if(refreshToken != null &&  !refreshToken.isBlank()){
            refreshTokenService.revoke(refreshToken);
        }

        SecurityContextHolder.clearContext();
    }

    @Override
    @Transactional
    public LoginResponse refresh( String refreshToken) {
        log.info("Refresh Token Request");

        //kiem tra RT
        RefreshToken rt = refreshTokenService.verifyAndGet(refreshToken);
        User user = rt.getUser();

        String newAccessToken = jwtProvider.generateJwtToken(user);

        return LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
