package com.hnv.augustine.feature.auth.service;

import com.hnv.augustine.feature.auth.entity.RefreshToken;
import com.hnv.augustine.feature.user.entity.User;
import org.springframework.security.core.Authentication;

public interface RefreshTokenService {
    String create(User user, String clientIp, String userAgent);

    void revoke(String rawToken);

    RefreshToken verifyAndGet(String rawToken);
}
