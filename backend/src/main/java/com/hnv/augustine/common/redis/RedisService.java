package com.hnv.augustine.common.redis;

import java.time.Duration;

public interface RedisService {
    void set(String key, Object value);

    void set(String key, Object value, Duration ttl);

    boolean exists(String key);

    void delete(String key);

    //SETNX
    boolean setIfAbsent(String key, Object value);

    boolean setIfAbsent(String key, Object value, Duration ttl);

    <T> T get(String key, Class<T> type);
}
