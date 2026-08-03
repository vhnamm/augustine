package com.hnv.augustine.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNAUTHENTICATED(1001, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    INVALID_CREDENTIALS(1002, "Tài khoản hoặc mật khẩu không đúng", HttpStatus.UNAUTHORIZED),
    PASSWORD_INVALID(2001, "Mật khẩu phải từ 3-20 ký tự và chứa ít nhất 1 ký tự đặc biệt", HttpStatus.BAD_REQUEST),
    USER_ALREADY_EXISTS(2002, "Người dùng đã tồn tại", HttpStatus.CONFLICT),
    ROLE_NOTFOUND(2003, "Role Not Found", HttpStatus.NOT_FOUND);
    private int code;
    private String message;
    private HttpStatus httpStatus;
}
