package com.hnv.augustine.feature.auth.service;

import com.hnv.augustine.feature.auth.dto.*;

public interface AuthenticationService {
    LoginResponse login(LoginRequest loginRequest, String clientIp, String userAgent);
    void register(RegisterRequest registerRequest);
    void logout(String accessToken, String refreshToken);
    LoginResponse refresh(String refreshToken);
    RegisterResponse confirm(ConfirmationRequest confirmationRequest);
}
