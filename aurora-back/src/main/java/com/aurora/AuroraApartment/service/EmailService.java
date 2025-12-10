package com.aurora.AuroraApartment.service;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
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
            "message", request.getMessage(),
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
            "yourMessage", yourMsg,
            "message", request.getMessage(),
            "regards", regards,
            "signature", signature
    ));


    return new EmailContent(subject, html);

    }


public void sendConfirmationToUser(ContactRequest request) {
   
        EmailContent email = translateMessage(request.getLanguage(), request);
        
        sendHtmlEmail(
                adminEmail,
                email.subject(),
                email.html(),
                request.getEmail()
        );

}

}
