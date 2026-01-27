package com.aurora.AuroraApartment.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aurora.AuroraApartment.model.PasswordUpdateToken;
import com.aurora.AuroraApartment.model.User;

public interface PasswordUpdateTokenRepository extends JpaRepository<PasswordUpdateToken, Integer> {
    Optional<PasswordUpdateToken> findByToken(String token);
    void deleteByUser(User user);
}
