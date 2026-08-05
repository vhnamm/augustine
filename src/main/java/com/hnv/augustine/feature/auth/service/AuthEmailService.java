package com.hnv.augustine.feature.auth.service;

public interface AuthEmailService {
    void sendEmail(String to, String otp, String subject);
}
