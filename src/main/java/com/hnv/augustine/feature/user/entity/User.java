package com.hnv.augustine.feature.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Nationalized;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class User implements UserDetails {
    @Id
    private Long id;

    @Column(length = 50,  nullable = false, unique = true)
    private String email;
    @Column
    private String password;

    @Column(length = 50, nullable = false, name = "full_name")
    @Nationalized
    private String fullName;

    private String avatar;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

    private boolean locked = false;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public @Nullable String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }


    @Override
    public boolean isAccountNonLocked(){
        return this.locked;
    }
}
