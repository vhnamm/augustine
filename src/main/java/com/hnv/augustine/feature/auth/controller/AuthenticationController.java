package com.hnv.augustine.feature.auth.controller;

import com.hnv.augustine.common.dto.ApiResponse;
import com.hnv.augustine.common.util.CookieUtil;
import com.hnv.augustine.common.util.HeaderUtil;
import com.hnv.augustine.feature.auth.dto.LoginRequest;
import com.hnv.augustine.feature.auth.dto.LoginResponse;
import com.hnv.augustine.feature.auth.dto.RegisterRequest;
import com.hnv.augustine.feature.auth.dto.RegisterResponse;
import com.hnv.augustine.feature.auth.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        RegisterResponse response = authenticationService.register(registerRequest);

        ApiResponse<RegisterResponse> apiResponse = ApiResponse.<RegisterResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Đăng ký thành công")
                .data(response)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);

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
     CookieUtil.deleteCookie(httpServletResponse, "refreshToken");

       // 3. Trả về 204 No Content (Không có body)
       return ResponseEntity.noContent()
               .build();
   }
}
