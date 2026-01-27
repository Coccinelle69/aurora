package com.aurora.AuroraApartment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import com.aurora.AuroraApartment.config.security.MyUserDetails;
import com.aurora.AuroraApartment.dto.ContactRequest;
import com.aurora.AuroraApartment.dto.password.ForgotPasswordResponse;
import com.aurora.AuroraApartment.dto.password.UpdatePasswordResponse;
import com.aurora.AuroraApartment.model.User;
import com.aurora.AuroraApartment.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authManager;
    private final SecurityContextRepository securityRepo;

    @MutationMapping
    public AuthPayload login(@Argument LoginInput loginInput) {

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        HttpServletResponse response = attributes.getResponse();

        Authentication auth = authManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginInput.email(), loginInput.password()));

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(auth);
        request.getSession(true);
        SecurityContextHolder.setContext(securityContext);

        securityRepo.saveContext(securityContext, request, response);

        User user = ((MyUserDetails) auth.getPrincipal()).getUser();
        return new AuthPayload(user);
    }


    @MutationMapping
    public ForgotPasswordResponse forgotPassword(@Argument String email) {

        return new ForgotPasswordResponse(true,"Reset link sent to " + email);
    }

    @MutationMapping
    public UpdatePasswordResponse updatePassword() {

        return new UpdatePasswordResponse(true, "Password updated successfully");
    }

    // @MutationMapping
    // public Boolean logout() {
    //     ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
    //     HttpServletRequest request = attributes.getRequest();
    //     HttpServletResponse response = attributes.getResponse();
    //     Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    //     if(auth != null) {
    //         new SecurityContextLogoutHandler().logout(request, response, auth);
    //         return true;
    //     }

    //     return false;
    // }

    // @PostMapping("/check")
    // public ResponseEntity<?> verifyForm(@Valid @RequestBody ContactRequest request) {

    //     return ResponseEntity.ok("{\"success\": true}");
    // }

    @QueryMapping
    public User me() {
        return authService.getAuthenticatedUser();
    }


}

record LoginInput(String email, String password) {} 

record AuthPayload(User user) {}
