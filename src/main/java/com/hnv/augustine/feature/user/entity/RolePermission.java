package com.hnv.augustine.feature.user.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role_permissions")
public class RolePermission {
    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "permission_id")
    private Permission permission;

}
