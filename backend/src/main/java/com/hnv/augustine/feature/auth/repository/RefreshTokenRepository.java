package com.hnv.augustine.feature.auth.repository;

import com.hnv.augustine.feature.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    @EntityGraph(attributePaths = {"user"})
    Optional<RefreshToken> findWithUserByTokenHash(String tokenHash);
}
