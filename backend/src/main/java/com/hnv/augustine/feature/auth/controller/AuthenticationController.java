package com.hnv.augustine.feature.auth.controller;

import com.hnv.augustine.common.dto.ApiResponse;
import com.hnv.augustine.common.exception.AppException;
import com.hnv.augustine.common.exception.ErrorCode;
import com.hnv.augustine.common.util.CookieUtil;
import com.hnv.augustine.common.util.HeaderUtil;
import com.hnv.augustine.feature.auth.dto.*;
import com.hnv.augustine.feature.auth.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @Value("${jwt.refresh-expiration}")
    private Long REFRESH_TOKEN_EXPIRATION_TIME;

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest,
                                   HttpServletRequest httpServletRequest,
                                   HttpServletResponse httpServletResponse
    ) {

        String clientIp = HeaderUtil.getClientIp(httpServletRequest);
        String userAgent = HeaderUtil.getUserAgent(httpServletRequest);

        LoginResponse loginResponse = authenticationService.login(loginRequest, clientIp, userAgent);

        CookieUtil.addCookie(httpServletResponse,
                "refreshToken",
                loginResponse.getRefreshToken(),
                "/api/v1/auth",
                REFRESH_TOKEN_EXPIRATION_TIME,
                true);

        ApiResponse<LoginResponse> response = ApiResponse.<LoginResponse>builder()
                .success(true)
                .code(HttpStatus.OK.value())
                .message("Đăng nhập thành công")
                .data(loginResponse)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest registerRequest){
        authenticationService.register(registerRequest);

        ApiResponse<RegisterResponse> apiResponse = ApiResponse.<RegisterResponse>builder()
                .code(HttpStatus.OK.value())
                .success(true)
                .message("Vui lòng kiểm hộp thư để xác nhận mã OTP at " + Instant.now().toString())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);

    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirm(@RequestBody @Valid ConfirmationRequest confirmationRequest){
        RegisterResponse registerResponse = authenticationService.confirm(confirmationRequest);

        ApiResponse<RegisterResponse> response = ApiResponse.<RegisterResponse>builder()
                .success(true)
                .message("Đăng ký tài khoản thành công")
                .data(registerResponse)
                .code(HttpStatus.CREATED.value())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

   @PostMapping("/logout")
   public ResponseEntity<Void> logout(
           HttpServletRequest httpServletRequest,
           HttpServletResponse httpServletResponse,
           @CookieValue(name = "refreshToken", required = false) String refreshToken
   ) {
       String accessToken = HeaderUtil.extractBearerToken(httpServletRequest);

       // 1. Thu hồi Token
       authenticationService.logout(accessToken, refreshToken);

       // 2. Xóa Cookie ở Browser Client
     CookieUtil.deleteCookie(httpServletResponse, "refreshToken", "/api/v1/auth");

       return ResponseEntity.noContent()
               .build();
   }

   @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
           HttpServletResponse httpServletResponse,
            @CookieValue(name = "refreshToken",  required = false) String refreshToken
   )
   {
        try {
            LoginResponse loginResponse = authenticationService.refresh(refreshToken);
            ApiResponse<LoginResponse> response = ApiResponse.<LoginResponse>builder()
                    .message("Refresh token thành công")
                    .success(true)
                    .data(loginResponse)
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (AppException ex){
            if (ex.getErrorCode() == ErrorCode.UNAUTHENTICATED) {
                CookieUtil.deleteCookie(httpServletResponse, "refreshToken", "/api/v1/auth");
            }
            throw ex;
        }

   }
}
