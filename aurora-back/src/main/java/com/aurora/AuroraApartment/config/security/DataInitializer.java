package com.aurora.AuroraApartment.config.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.aurora.AuroraApartment.dto.Role;
import com.aurora.AuroraApartment.model.User;
import com.aurora.AuroraApartment.repo.UserRepo;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_PASS_1:}") String pass1;
    @Value("${ADMIN_PASS_2:}") String pass2;
    @Value("${ADMIN_PASS_3:}") String pass3;

    @Override
    public void run(String... args) {
        syncAdmin("mmskrbin@gmail.com", pass1, "Marcela-Maria Skrbin",true);
        syncAdmin("2804.mail@gmail.com", pass2, "Duška Skrbin",false);
        syncAdmin("dorotea0105@gmail.com", pass3, "Dorotea Skrbin",false);
    }

    private void syncAdmin(String email, String rawPassword, String fullName,boolean isTech) {
        if (rawPassword == null || rawPassword.isEmpty()) return;

        userRepo.findByEmail(email).ifPresentOrElse(
            user -> { },
            () -> {
                User admin = new User();
                admin.setEmail(email);
                admin.setPassword(passwordEncoder.encode(rawPassword));
                admin.setFullName(fullName);
                admin.setRole(Role.ADMIN);
                admin.setIsTechnicalContact(isTech);
                userRepo.save(admin);
            }
        );
    }
}