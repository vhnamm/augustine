package com.hnv.augustine.common.mail;

import io.netty.util.concurrent.CompleteFuture;

import java.util.concurrent.CompletableFuture;

public interface EmailService {
    CompletableFuture<Void> sendHtmlEmail(String to, String subject, String body);
}
