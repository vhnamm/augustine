package com.hnv.augustine.feature.auth.service;

import java.time.Instant;

public interface TokenBlacklistService {
    boolean isBlacklisted(String tokenJti);
    void blacklist(String tokenJti, Instant expiration);
}
