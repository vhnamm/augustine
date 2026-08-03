package com.hnv.augustine.feature.auth.service;

public interface TokenBlacklistService {
    boolean isBlacklisted(String tokenJti);
}
