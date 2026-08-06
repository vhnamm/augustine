package com.hnv.augustine.feature.auth.service.impl;

import com.hnv.augustine.common.exception.AppException;
import com.hnv.augustine.common.exception.ErrorCode;
import com.hnv.augustine.common.util.DigestUtil;
import com.hnv.augustine.feature.auth.entity.RefreshToken;
import com.hnv.augustine.feature.auth.repository.RefreshTokenRepository;
import com.hnv.augustine.feature.auth.service.RefreshTokenService;
import com.hnv.augustine.feature.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.refresh-expiration}")
    private Long REFRESH_TOKEN_EXPIRATION_TIME;

    public String create(Authentication authentication, String clientIp, String userAgent) {
        String raw = UUID.randomUUID().toString();

        String tokenHash = DigestUtil.sha256(raw);
        RefreshToken refreshToken = RefreshToken.builder()
                .user((User) authentication.getPrincipal())
                .clientIp(clientIp)
                .userAgent(userAgent)
                .tokenHash(tokenHash)
                .expiredAt(Instant.now().plusMillis(REFRESH_TOKEN_EXPIRATION_TIME))
                .build();

        refreshTokenRepository.save(refreshToken);

        return raw;
    }

    @Override
    public void revoke(String rawToken) {
        if (rawToken == null || rawToken.isBlank()) {
            return;
        }
        String tokenHash = DigestUtil.sha256(rawToken);
        refreshTokenRepository.deleteById(tokenHash);
    }

    @Override
    public RefreshToken verifyAndGet(String rawToken) {
        if (rawToken == null || rawToken.isBlank()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String tokenHash = DigestUtil.sha256(rawToken);
        RefreshToken refreshToken = refreshTokenRepository.findWithUserByTokenHash(tokenHash).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );

        if(Instant.now().isAfter(refreshToken.getExpiredAt())){
            refreshTokenRepository.deleteById(tokenHash);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return refreshToken;
    }
}
