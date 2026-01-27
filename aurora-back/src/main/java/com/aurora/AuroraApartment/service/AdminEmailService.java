package com.aurora.AuroraApartment.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminEmailService {
    
    private final JavaMailSender mailSender;

    @Value("${CONTACT_RECEIVER_EMAIL}")
    private String adminEmail;
    @Value("${SPRING_MAIL_USERNAME}")
    private String fromEmail;

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
        ClassPathResource resource = new ClassPathResource("email-templates/admin" + name + ".html");
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

    public void sendPasswordResetEmail(String recipientEmail, String resetUrl, String fullName) {
        String template = loadTemplate("reset-password");

         String html = apply(template, Map.of(
            "fullName", fullName,
            "resetUrl", resetUrl
    ));

    sendHtmlEmail(
                adminEmail,
                "Reset Your Password",
                html,
                recipientEmail
        );
    }
}
