package com.aurora.AuroraApartment.service;


import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import com.aurora.AuroraApartment.dto.ContactRequest;


@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${contact.receiver.email}")
    private String adminEmail;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private MessageSource messageSource;

    public record EmailContent(String subject, String html) {}


    private EmailContent translateMessage(String language, ContactRequest request) {
        Locale locale = Locale.forLanguageTag(language);

        String subject = messageSource.getMessage("email.subject", null, locale);

        String hello = messageSource.getMessage("email.hello", new Object[]{request.getFirstName()}, locale);

        String thanks = messageSource.getMessage("email.thanks", null, locale);
        String yourMsg = messageSource.getMessage("email.yourMessage", null, locale);
        String regards = messageSource.getMessage("email.regards", null, locale);
        String signature = messageSource.getMessage("email.signature", null, locale);

        String html = """
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #234361;">%s</h2>
        <p style="font-size: 16px;">%s</p>

        <div style="margin-top: 20px; padding: 15px; background: #F0F4F8;
            border-left: 4px solid #234361;">
            <strong>%s</strong>
            <p>%s</p>
        </div>

        <p style="margin-top: 25px; font-size: 14px; color: #234361;">
            %s<br>
            <strong>%s</strong>
        </p>
    </div>
    """.formatted(hello, thanks, yourMsg, request.getMessage(), regards, signature);

    return new EmailContent(subject, html);

    }

   

    // 1. Email TO admin
    public void sendToAdmin(ContactRequest request) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(adminEmail);
            helper.setReplyTo(request.getEmail());
            helper.setSubject("New message from " + request.getFirstName() + " " + request.getLastName());

            @NotNull
           final String html = """
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #234361;">Hello Dorotea,</h2>
                    <p style="font-size: 16px;">
                       {{firstname}} {{lastname}} has just sent you a message and is waiting for your response.
                    </p>

                    <div style="margin-top: 20px; padding: 15px; background: #F0F4F8; border-left: 4px solid #234361;">
                        <strong>Their message:</strong>
                        <p>{{message}}</p>
                    </div>

                    <p style="margin-top: 25px; font-size: 16px;">
                        Be sure to respond by mail or give them a call <strong>{{phone}}</strong>
                    </p>

                    <p style="margin-top: 25px; font-size: 14px; color: #234361;">
                        Best regards,<br>
                        <strong>Admin Team</strong>
                    </p>
                </div>
                """.replace("{{firstname}}", request.getFirstName())
                    .replace("{{lastname}}", request.getLastName())
                    .replace("{{message}}", request.getMessage())
                    .replace("{{phone}}", request.getPhone());

        helper.setText(html, true); 

        mailSender.send(message);
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } 
       

    }

    // 2. Confirmation email TO USER


public void sendConfirmationToUser(ContactRequest request) {
    try {
       

       MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(request.getEmail());
        
        
        EmailContent email = translateMessage(request.getLanguage(), request);
        
        helper.setSubject(email.subject());

        helper.setText(email.html(), true); 
        // helper.setText("TEST CONFIRMATION", false); 

        mailSender.send(message);

    } catch (Exception ex) {
        ex.printStackTrace();
    }
}

}
