package com.aurora.AuroraApartment.service;

import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.aurora.AuroraApartment.model.PasswordUpdateToken;
import com.aurora.AuroraApartment.model.User;
import com.aurora.AuroraApartment.repo.PasswordUpdateTokenRepository;
import com.aurora.AuroraApartment.repo.UserRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
    
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AdminEmailService adminEmailService;
    private final PasswordUpdateTokenRepository passwordResetTokenRepo;

      
    public void createPasswordResetToken(String email) {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        passwordResetTokenRepo.deleteByUser(user);

        String token = UUID.randomUUID().toString();
        PasswordUpdateToken resetToken = PasswordUpdateToken.createPasswordResetToken(token, user, LocalDateTime.now().plusHours(24));
        
        passwordResetTokenRepo.save(resetToken);
        
        adminEmailService.sendPasswordResetEmail(user.getEmail(), token, user.getFullName());
    }

    public void resetPassword(String token, String newPassword) {
        PasswordUpdateToken resetToken = passwordResetTokenRepo.findByToken(token)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
             new RuntimeException("Token expired");
        }
        
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        
        passwordResetTokenRepo.delete(resetToken);
    }

    public boolean validateToken(String token){
        return passwordResetTokenRepo
            .findByToken(token)
            .map(t->t.getExpiryDate()
            .isAfter(LocalDateTime.now()))
            .orElse(false);
    }

}
