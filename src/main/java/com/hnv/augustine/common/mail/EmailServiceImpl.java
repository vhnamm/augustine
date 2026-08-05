package com.hnv.augustine.common.mail;

import com.hnv.augustine.common.exception.AppException;
import com.hnv.augustine.common.exception.ErrorCode;
import io.netty.util.concurrent.CompleteFuture;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String from;

    @Async
    public CompletableFuture<Void> sendHtmlEmail(String to, String subject, String body) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
            log.info("Đã gửi mail thành công tới {} at {} ", to, Instant.now());
            return CompletableFuture.completedFuture(null);
        } catch (MessagingException e) {
            return CompletableFuture.failedFuture(new AppException(ErrorCode.SEND_MAIL_FAIL));

        }

    }
}
