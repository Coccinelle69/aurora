package com.aurora.AuroraApartment.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.aurora.AuroraApartment.dto.PaymentMethod;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "password_update_token")
public class PasswordUpdateToken {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;
    
    @Column(name = "local_date_time", nullable = false)
    private LocalDateTime expiryDate;

    public static PasswordUpdateToken createPasswordResetToken(
            String token,
            User user,
            LocalDateTime expiryDate
    ) {
        
        return PasswordUpdateToken.builder()
                .token(token)
                .user(user)
                .expiryDate(expiryDate)
                .build();
    }
}
