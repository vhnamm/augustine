package com.hnv.augustine.feature.auth.controller;

import com.hnv.augustine.common.dto.ApiResponse;
import com.hnv.augustine.feature.auth.dto.LoginRequest;
import com.hnv.augustine.feature.auth.dto.LoginResponse;
import com.hnv.augustine.feature.auth.dto.RegisterRequest;
import com.hnv.augustine.feature.auth.dto.RegisterResponse;
import com.hnv.augustine.feature.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest){
        System.out.println(new BCryptPasswordEncoder().encode("123456@"));
        LoginResponse loginResponse = authenticationService.login(loginRequest);
        // Thêm <LoginResponse> trước builder()
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
}
