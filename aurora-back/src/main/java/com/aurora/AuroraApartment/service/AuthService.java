package com.aurora.AuroraApartment.service;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import com.aurora.AuroraApartment.config.security.MyUserDetails;
import com.aurora.AuroraApartment.model.User;
import com.aurora.AuroraApartment.repo.UserRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    public User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("🔍 Auth: " + auth);
    System.out.println("🔍 Principal type: " + (auth != null ? auth.getPrincipal().getClass() : "null"));
        
        if (auth == null || !auth.isAuthenticated() || 
            auth instanceof AnonymousAuthenticationToken) {
                        System.out.println("❌ Not authenticated");

            return null;
        }

        Object principal = auth.getPrincipal();
        
            
            if (principal instanceof OAuth2User oAuth2User) {
                String email = oAuth2User.getAttribute("email");
                System.out.println("📧 OAuth email: " + email);
                User user = userRepo.findByEmail(email).orElse(null);
                System.out.println("👤 Found user: " + (user != null ? user.getEmail() : "null"));
                return user;
            } else if (principal instanceof MyUserDetails userDetails) {
                System.out.println("👤 MyUserDetails: " + userDetails.getUser().getEmail());
                return userDetails.getUser();
            }
        
        return null;
    }
}
