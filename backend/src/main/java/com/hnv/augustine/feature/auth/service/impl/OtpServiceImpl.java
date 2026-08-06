package com.hnv.augustine.feature.auth.service.impl;

import com.hnv.augustine.common.exception.AppException;
import com.hnv.augustine.common.exception.ErrorCode;
import com.hnv.augustine.common.mail.EmailService;
import com.hnv.augustine.common.redis.RedisService;
import com.hnv.augustine.feature.auth.service.AuthEmailService;
import com.hnv.augustine.feature.auth.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
    private final AuthEmailService authEmailService;
    private final RedisService redisService;
    private final PasswordEncoder passwordEncoder;

    private String PREFIX = "auth:otp:";

    @Value("${otp.expiration}")
    private Long OTP_TTL;

    public void generateAndSendOTP(String email, String subject){
        String otp = getRandomOTP();
        redisService.set(PREFIX + email, passwordEncoder.encode(otp), Duration.ofMillis(OTP_TTL));
        authEmailService.sendEmail(email, otp, subject);
    }

    public void verifyOTP(String email, String otp){
        String key = PREFIX + email;
        String cachedOtp = redisService.get(key, String.class);
        if(cachedOtp == null){
            throw new AppException(ErrorCode.OTP_INVALID);
        }
        if(!passwordEncoder.matches(otp, cachedOtp)){
            throw new AppException(ErrorCode.OTP_INVALID);
        }
        //dung roi thi xoa otp
        redisService.delete(key);
    }
    private String getRandomOTP(){
        return String.valueOf(new SecureRandom().nextInt(1000000) + 100000);
    }
}
