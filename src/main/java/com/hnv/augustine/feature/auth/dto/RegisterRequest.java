package com.hnv.augustine.feature.auth.dto;

import com.hnv.augustine.common.validation.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @Email
    @NotBlank
    private String email;
    @Password
    @NotBlank
    private String password;
    @NotBlank
    private String fullName;
}
