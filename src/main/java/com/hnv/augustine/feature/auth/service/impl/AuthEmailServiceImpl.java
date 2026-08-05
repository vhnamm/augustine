package com.hnv.augustine.feature.auth.service.impl;

import com.hnv.augustine.common.mail.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthEmailServiceImpl implements com.hnv.augustine.feature.auth.service.AuthEmailService {
    private final EmailService emailService;

    public void sendEmail(String to, String otp, String subject){
        String html = createContent(otp);
        emailService.sendHtmlEmail(to, subject, html);
    }

    private String createContent(String otp){
        String template = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    background-color: #f4f4f5;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                }
                .wrapper {
                    width: 100%;
                    background-color: #f4f4f5;
                    padding: 40px 0;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    border: 1px solid #e4e4e7;
                    padding: 40px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }
                .brand {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 3px;
                    color: #09090b;
                    text-transform: uppercase;
                    margin-bottom: 30px;
                }
                .title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #18181b;
                    margin-bottom: 12px;
                }
                .content {
                    font-size: 14px;
                    color: #52525b;
                    line-height: 1.6;
                    margin-bottom: 28px;
                }
                .otp-box {
                    text-align: center;
                    background-color: #f4f4f5;
                    border-radius: 6px;
                    padding: 16px;
                    margin-bottom: 28px;
                }
                .otp-code {
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 32px;
                    font-weight: 700;
                    color: #09090b;
                    letter-spacing: 8px;
                }
                .divider {
                    border-top: 1px solid #f4f4f5;
                    margin: 28px 0;
                }
                .footer {
                    font-size: 12px;
                    color: #a1a1aa;
                    line-height: 1.5;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="brand">Augustine</div>
                    <div class="title">Xác thực mã OTP</div>
                    <div class="content">
                        Xin chào,<br><br>
                        Bạn vừa yêu cầu mã xác thực cho tài khoản tại <b>Augustine</b>. Vui lòng nhập mã OTP dưới đây để hoàn tất thao tác:
                    </div>
                    <div class="otp-box">
                        <div class="otp-code">{{OTP}}</div>
                    </div>
                    <div class="content" style="font-size: 13px; color: #71717a;">
                        • Mã OTP có hiệu lực trong <b>5 phút</b>.<br>
                        • Tuyệt đối không chia sẻ mã này cho bất kỳ ai khác.
                    </div>
                    <div class="divider"></div>
                    <div class="footer">
                        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.<br>
                        © Augustine. All rights reserved.
                    </div>
                </div>
            </div>
        </body>
        </html>
        """;

        return template.replace("{{OTP}}", otp);
    }
}
