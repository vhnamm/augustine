package com.hnv.augustine.feature.auth.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PendingRegistrationDto {
    private String email;
    private String passwordHash;
    private String fullName;
}
