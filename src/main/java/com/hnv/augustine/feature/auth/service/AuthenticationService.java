package com.hnv.augustine.feature.auth.service;

import com.hnv.augustine.feature.auth.dto.LoginRequest;
import com.hnv.augustine.feature.auth.dto.LoginResponse;
import com.hnv.augustine.feature.auth.dto.RegisterRequest;
import com.hnv.augustine.feature.auth.dto.RegisterResponse;

public interface AuthenticationService {
    LoginResponse login(LoginRequest loginRequest);
    RegisterResponse register(RegisterRequest registerRequest);
}
