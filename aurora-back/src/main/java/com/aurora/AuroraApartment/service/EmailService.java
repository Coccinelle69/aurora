package com.aurora.AuroraApartment.service;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import com.aurora.AuroraApartment.dto.ContactRequest;
import com.aurora.AuroraApartment.dto.ReservationRequest;


@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${CONTACT_RECEIVER_EMAIL}")
    private String adminEmail;

    @Value("${SPRING_MAIL_USERNAME}")
    private String fromEmail;

    @Autowired
    private MessageSource messageSource;

    private void sendHtmlEmail(String to, String subject, String html, String replyTo) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);

            if (replyTo != null) {
                helper.setReplyTo(replyTo);
            }

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email to " + to, e);
        }
    }

    private String loadTemplate(String name) {
    try {
        ClassPathResource resource = new ClassPathResource("email-templates/" + name + ".html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    } catch (IOException e) {
        throw new RuntimeException("Cannot load template: " + name, e);
    }
}

private String apply(String template, Map<String, String> values) {
    String result = template;
    for (var entry : values.entrySet()) {
        result = result.replace("{{" + entry.getKey() + "}}", entry.getValue());
    }
    return result;
}

    public record EmailContent(String subject, String html) {}


    // 1. Email TO admin
    public void sendToAdmin(ContactRequest request) {
        String template = loadTemplate("contact-admin");

    String html = apply(template, Map.of(
            "firstname", request.getFirstName(),
            "lastname", request.getLastName(),
            "userMessage", request.getMessage(),
            "email", request.getEmail(),
            "phone", request.getPhone()
    ));

    sendHtmlEmail(
                adminEmail,
                "New message from " + request.getFirstName() + " " + request.getLastName(),
                html,
                request.getEmail()
        );
    }

     public void sendCheckoutRecapToAdmin(ReservationRequest request) {
        String template = loadTemplate("checkout-admin");

        String userMessageBlock = "";
        if (request.getMessage() != null && !request.getMessage().isBlank()) {
            userMessageBlock =
            "<div style=\"margin-top: 20px; padding: 15px; background: #f0f4f8; border-left: 4px solid #234361;\">" +
            "<strong>Their message:</strong>" +
            "<p>" + request.getMessage() + "</p>" +
            "</div>";
}
        Integer guests = request.getAdults() + request.getAdults() +  request.getAdults();

        String html = apply(template, Map.of(
            "firstname", request.getFirstName(),
            "lastname", request.getLastName(),
            "userMessage", userMessageBlock,
            "email", request.getEmail(),
            "phone", request.getPhone(),
            "guests", guests.toString(),
            "arrival", request.getArrivalDate().toString(),
            "departure", request.getDepartureDate().toString()
            
    ));

    sendHtmlEmail(
                adminEmail,
                "New booking inquiry from " + request.getFirstName() + " " + request.getLastName(),
                html,
                request.getEmail()
        );
    }

    // 2. Confirmation email TO USER & translation

    private EmailContent translateMessage(String language, ContactRequest request) {
        Locale locale = Locale.forLanguageTag(language);

        String subject = messageSource.getMessage("email.subject", null, locale);
        String hello = messageSource.getMessage("email.hello", new Object[]{request.getFirstName()}, locale);
        String thanks = messageSource.getMessage("email.thanks", null, locale);
        String yourMsg = messageSource.getMessage("email.yourMessage", null, locale);
        String regards = messageSource.getMessage("email.regards", null, locale);
        String signature = messageSource.getMessage("email.signature", null, locale);


        String template = loadTemplate("contact-confirmation");

        String html = apply(template, Map.of(
            "hello", hello,
            "thanks", thanks,
            "yourMessage",yourMsg,
            "userMessage", request.getMessage(),
            "regards", regards,
            "signature", signature
    ));


    return new EmailContent(subject, html);

    }
    private EmailContent translateMessage(String language, ReservationRequest request) {
        Locale locale = Locale.forLanguageTag(language);

        String bookingSubject = messageSource.getMessage("email.bookingSubject", null, locale);
        String hello = messageSource.getMessage("email.hello", new Object[]{request.getFirstName()}, locale);
        String thanks = messageSource.getMessage("email.thanksMessage", null, locale);
        String yourMsg = messageSource.getMessage("email.yourMessage", null, locale);
        String regards = messageSource.getMessage("email.regards", null, locale);
        String signature = messageSource.getMessage("email.signature", null, locale);
        String recap = messageSource.getMessage("email.recap",null, locale);
        String payment = messageSource.getMessage("email.payment",null, locale);
        String arrival = messageSource.getMessage("email.arrival",null, locale);
        String departure = messageSource.getMessage("email.departure",null, locale);
        String nights = messageSource.getMessage("email.nights",null, locale);
        String guests = messageSource.getMessage("email.guests",null, locale);
        String cancellationPolicy = messageSource.getMessage("email.cancellationPolicy",null, locale);
        String cancellationText = messageSource.getMessage("email.cancellationText",null, locale);
        String total = messageSource.getMessage("email.total",null, locale);
        String cleaningFee = messageSource.getMessage("email.cleaningFee",null, locale);
        String cleaningIncluded = messageSource.getMessage("email.cleaningIncluded",null, locale);
        String taxes = messageSource.getMessage("email.taxes",null, locale);
        String taxesIncluded = messageSource.getMessage("email.taxesIncluded",null, locale);
        String priceDetails = messageSource.getMessage("email.priceDetails",null, locale);

        String userMessageBlock = "";
        if (request.getMessage() != null && !request.getMessage().isBlank()) {
            userMessageBlock =
                "<div style=\"margin-top: 20px; padding: 15px; background: #f0f4f8; border-left: 4px solid #234361;\">" +
                "<strong>"+ yourMsg +":</strong>" +
                "<p>" + request.getMessage() + "</p>" +
                "</div>";
}
        String template = loadTemplate("checkout-confirmation");
        Integer guestsNo = request.getAdults() + request.getAdults() +  request.getAdults();


       Map<String, String> vars = new HashMap<>();

        vars.put("bookingSubject", bookingSubject);
        vars.put("hello", hello);
        vars.put("thanks", thanks);
        vars.put("userMessage", userMessageBlock);
        vars.put("regards", regards);
        vars.put("signature", signature);
        vars.put("recap", recap);
        vars.put("payment", payment);
        vars.put("arrival", arrival);
        vars.put("departure", departure);
        vars.put("nights", nights);
        vars.put("guests", guests);
        vars.put("cancellationPolicy", cancellationPolicy);
        vars.put("cancellationText", cancellationText);
        vars.put("total", total);
        vars.put("cleaningFee", cleaningFee);
        vars.put("cleaningIncluded", cleaningIncluded);
        vars.put("taxes", taxes);
        vars.put("taxesIncluded", taxesIncluded);
        vars.put("priceDetails", priceDetails);
        vars.put("arrival", request.getArrivalDate().toString());
        vars.put("departure", request.getDepartureDate().toString());
        vars.put("guestsNo", guestsNo.toString());

        String html = apply(template, vars);

    return new EmailContent(bookingSubject, html);

    }


public void sendConfirmationToUser(ContactRequest request) {
        EmailContent email = translateMessage(request.getLanguage(), request);
        sendHtmlEmail(
                request.getEmail(),
                email.subject(),
                email.html(),
                request.getEmail()
        );

}

public void sendCheckoutRecapToUser(ReservationRequest request) {
        EmailContent email = translateMessage(request.getLanguage(), request);
        sendHtmlEmail(
                request.getEmail(),
                email.subject(),
                email.html(),
                request.getEmail()
        );
    }

}


