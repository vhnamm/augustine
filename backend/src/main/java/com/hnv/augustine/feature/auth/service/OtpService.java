package com.hnv.augustine.feature.auth.service;

public interface OtpService {
   void generateAndSendOTP(String email, String subject);
    void verifyOTP(String email, String otp);
}
