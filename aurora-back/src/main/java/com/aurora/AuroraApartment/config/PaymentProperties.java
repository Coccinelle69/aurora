package com.aurora.AuroraApartment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import lombok.Data;

@Component
@ConfigurationProperties
@Data
@Validated
public class PaymentProperties {
    @Value("${ACCOUNT_HOLDER}")
    private String accountHolder;
    @Value("${IBAN}")
    private String iban;
    @Value("${BIC}")
    private String bic;
}

