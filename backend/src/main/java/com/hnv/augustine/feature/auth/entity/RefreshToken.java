package com.hnv.augustine.feature.auth.entity;

import com.hnv.augustine.feature.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class RefreshToken {
    @Id
    @Column(name = "token_hash")
    private String tokenHash;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String clientIp;

    private String userAgent;

    private Instant expiredAt;

    //heper
    public boolean isExpired() {
        return Instant.now().isAfter(this.expiredAt);
    }
}
