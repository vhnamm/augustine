package com.hnv.augustine.feature.auth.repository;

import com.hnv.augustine.feature.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

}
