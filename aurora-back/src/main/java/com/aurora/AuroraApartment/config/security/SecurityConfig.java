package com.aurora.AuroraApartment.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.aurora.AuroraApartment.model.User;
import com.aurora.AuroraApartment.repo.UserRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepo userRepo;
@Bean
public SecurityContextRepository securityContextRepository() {
    return new HttpSessionSecurityContextRepository();
}
    
    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, SecurityContextRepository repo) throws Exception {
        http
        .cors(Customizer.withDefaults())
        .csrf(csrf->csrf.disable())
        .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/admin/auth/**").permitAll()
                .requestMatchers("/graphql", "/graphiql/**").permitAll()
                .requestMatchers("/admin/**").authenticated()
                .anyRequest().denyAll()
            )
            .securityContext(context->context.securityContextRepository(repo).requireExplicitSave(false))
        .sessionManagement(session->
            session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            .sessionFixation(fixation->fixation.migrateSession())) 
        .exceptionHandling(exception -> exception
            .authenticationEntryPoint((request, response, authException) -> {
                if (request.getRequestURI().startsWith("/graphql")) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                } else {
                    response.sendRedirect("/oauth2/authorization/google");
                }
            })
        )  
       .oauth2Login(oauth2 -> oauth2
                .successHandler((request, response, authentication) -> {
            System.out.println("Authentication: " + authentication);
            System.out.println("Principal: " + authentication.getPrincipal());
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
                repo.saveContext(context, request, response);
                
                System.out.println("✅ OAuth Success! Saved auth: " + authentication.getName());
                
                response.sendRedirect("http://localhost:3000/admin/dashboard");
            })
                .userInfoEndpoint(userInfo -> userInfo
                    .oidcUserService(oidcUserService(userRepo)))
                .failureHandler((request, response, exception) -> {
            System.out.println("Error: " + exception.getMessage());
            exception.printStackTrace();
            response.sendRedirect("http://localhost:3000/admin/login");
        })
            )
        .logout(logout->
            logout.logoutUrl("/graphql/logout")
            .deleteCookies("JSESSIONID")
            .invalidateHttpSession(true)
            .logoutSuccessHandler((req, res, auth)->res.setStatus(200))
        );

        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

 @Bean
public OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService(UserRepo userRepo) {
    OidcUserService delegate = new OidcUserService();
    
    return userRequest -> {
        OidcUser oidcUser = delegate.loadUser(userRequest);
        String email = oidcUser.getEmail();
        
        userRepo.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFullName(oidcUser.getFullName());
            return userRepo.save(newUser);
        });
        
        return oidcUser;
    };
}
// @Bean
// public WebMvcConfigurer corsConfigurer() {
//     return new WebMvcConfigurer() {
//         @Override
//         public void addCorsMappings(CorsRegistry registry) {
//             registry.addMapping("/**")
//                     .allowedOrigins("http://localhost:3000") // Must match your frontend exactly
//                     .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                     .allowedHeaders("*")
//                     .allowCredentials(true)
//                     .exposedHeaders("Set-Cookies");
//         }
//     };
// }
}
