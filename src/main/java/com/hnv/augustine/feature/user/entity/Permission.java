package com.hnv.augustine.feature.user.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;

    @Column
    private String description;
}
