package com.hnv.augustine.feature.user.repository;

import com.hnv.augustine.feature.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role r " +
            "JOIN FETCH r.permissions rp " +
            "JOIN FETCH rp.permission " +
            "WHERE u.email = :email")
    Optional<User> findByEmailWithAuthorities(@Param("email") String email);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

}
