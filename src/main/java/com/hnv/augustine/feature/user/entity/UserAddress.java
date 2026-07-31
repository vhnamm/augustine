package com.hnv.augustine.feature.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_address")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 10)
    private String phone;

    @Column(length = 50)
    private String province;

    @Column(length = 50)
    private String ward;

    @Column(columnDefinition = "TEXT")
    private String detail;

}
