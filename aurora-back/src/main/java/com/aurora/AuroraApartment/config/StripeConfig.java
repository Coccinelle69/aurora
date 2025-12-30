package com.aurora.AuroraApartment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.stripe.Stripe;

import jakarta.annotation.PostConstruct;
import lombok.Data;

@Configuration
@Data
public class StripeConfig {
    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;
    @Value("${STRIPE_WEBHOOK_SECRET}")
    private String webhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;

    }
}
