package com.hnv.augustine.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNAUTHENTICATED(1001, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    INVALID_CREDENTIALS(1002, "Tài khoản hoặc mật khẩu không đúng", HttpStatus.UNAUTHORIZED),

    OTP_INVALID(2000, "Mã OTP đã hết hạn hoặc không tồn tại. Vui lòng lấy mã mới!", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(2001, "Mật khẩu phải từ 3-20 ký tự và chứa ít nhất 1 ký tự đặc biệt", HttpStatus.BAD_REQUEST),
    USER_ALREADY_EXISTS(2002, "Người dùng đã tồn tại", HttpStatus.CONFLICT),
    ROLE_NOTFOUND(2003, "Role Not Found", HttpStatus.NOT_FOUND),
    SEND_MAIL_FAIL(2004, "Error when sending mail", HttpStatus.INTERNAL_SERVER_ERROR),
    PENDING_REGIS_NOT_FOUND(2005, "Không tìm thấy thông tin đăng ký hoặc phiên làm việc đã hết hạn!", HttpStatus.BAD_REQUEST);
    private int code;
    private String message;
    private HttpStatus httpStatus;
}
