package com.hnv.augustine.feature.auth.service.impl;

import com.hnv.augustine.common.redis.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class TokenBlacklistServiceImpl implements com.hnv.augustine.feature.auth.service.TokenBlacklistService {
    private final RedisService redisService;
    private final String PREFIX = "auth:blacklist:";

    @Override
    public boolean isBlacklisted(String tokenJti){
        return redisService.exists(PREFIX + tokenJti);
    }

    public void blacklist(String tokenJti, Instant expiration){
        Duration remainingTTL = Duration.between(expiration, Instant.now());
        if(!remainingTTL.isNegative() &&  !remainingTTL.isZero()){
            redisService.set(PREFIX + tokenJti, true, remainingTTL);
        }
    }
}
