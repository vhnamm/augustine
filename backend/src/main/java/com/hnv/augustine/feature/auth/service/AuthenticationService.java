package com.hnv.augustine.feature.auth.service;

import com.hnv.augustine.feature.auth.dto.*;
import com.hnv.augustine.feature.user.entity.User;

public interface AuthenticationService {
    LoginResponse login(LoginRequest loginRequest, String clientIp, String userAgent);
    void register(RegisterRequest registerRequest);
    void logout(String accessToken, String refreshToken);
    LoginResponse refresh(String refreshToken);
    RegisterResponse confirm(ConfirmationRequest confirmationRequest);
    User processGoogleLogin(String email, String fullName, String imgUrl, String googleId);
}
