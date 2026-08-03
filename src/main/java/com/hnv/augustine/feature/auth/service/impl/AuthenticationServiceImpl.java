package com.hnv.augustine.feature.auth.service.impl;

import com.hnv.augustine.common.exception.AppException;
import com.hnv.augustine.common.exception.ErrorCode;
import com.hnv.augustine.feature.auth.dto.LoginRequest;
import com.hnv.augustine.feature.auth.dto.LoginResponse;
import com.hnv.augustine.feature.auth.dto.RegisterRequest;
import com.hnv.augustine.feature.auth.dto.RegisterResponse;
import com.hnv.augustine.feature.auth.service.AuthenticationService;
import com.hnv.augustine.feature.user.entity.Role;
import com.hnv.augustine.feature.user.entity.User;
import com.hnv.augustine.feature.user.mapper.UserMapper;
import com.hnv.augustine.feature.user.repository.RoleRepository;
import com.hnv.augustine.feature.user.repository.UserRepository;
import com.hnv.augustine.security.jwt.JwtProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        log.info("Login Request: {}", loginRequest);
        //authenticationManager kết hợp 2 thằng UserDetaileService và PasswordEncoder
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtProvider.generateJwtToken(authentication);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    public RegisterResponse register(RegisterRequest registerRequest){
        //đẩy nghiệp vụ check exist cho DB(unique constraint tránh concurency)
        log.info("Register Request: {}", registerRequest);
        try{
            Role role = roleRepository.findByName("USER").orElseThrow(() -> new AppException(ErrorCode.ROLE_NOTFOUND));
            User user = userMapper.toUser(registerRequest);
            user.setRole(role);

            User saved = userRepository.save(user);

            return userMapper.toRegisterResponse(saved);

        }catch (DataIntegrityViolationException ex){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
    }
}
