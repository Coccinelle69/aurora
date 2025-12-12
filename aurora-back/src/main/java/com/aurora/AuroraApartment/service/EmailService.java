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
import com.aurora.AuroraApartment.model.Contact;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.service.pricing.CheckoutCard;
import com.aurora.AuroraApartment.service.pricing.CheckoutService;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final CheckoutService checkoutService;
    private final ReservationService reservationService;

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
    public void sendToAdmin(Contact contact) {
        String template = loadTemplate("contact-admin");

    String html = apply(template, Map.of(
            "firstname", contact.getFirstName(),
            "lastname", contact.getLastName(),
            "userMessage", contact.getMessage(),
            "email", contact.getEmail(),
            "phone", contact.getPhone()
    ));

    sendHtmlEmail(
                adminEmail,
                "New message from " + contact.getFirstName() + " " + contact.getLastName(),
                html,
                contact.getEmail()
        );
    }

     public void sendCheckoutRecapToAdmin(Reservation reservation) {
        String template = loadTemplate("checkout-admin");

        String userMessageBlock = "";
        if (reservation.getMessage() != null && !reservation.getMessage().isBlank()) {
            userMessageBlock =
            "<div style=\"margin-top: 20px; padding: 15px; background: #f0f4f8; border-left: 4px solid #234361;\">" +
            "<strong>Their message:</strong>" +
            "<p>" + reservation.getMessage() + "</p>" +
            "</div>";
}
    Integer guests = reservation.getAdults() + reservation.getChildren() +  reservation.getTeens();
    CheckoutCard  checkoutCard = checkoutService.build(reservation.getArrivalDate(), reservation.getDepartureDate(), guests);

    Map<String, String> vars = new HashMap<>();

    String priceDetails;

    if (checkoutCard.isSplit()) {
    priceDetails = """
        <tr>
            <td>%s – %s</td>
            <td style="text-align: right">%d Nights × € %d</td>
            <td style="text-align: right">€ %d</td>
        </tr>
        <tr>
            <td>%s – %s</td>
            <td style="text-align: right">%d Nights × € %d</td>
            <td style="text-align: right">€ %d</td>
        </tr>
    """.formatted(
        checkoutCard.getFromDates().get(0),
        checkoutCard.getFromDates().get(1),
        checkoutCard.getFromNights(),
        checkoutCard.getFromPrice(),
        checkoutCard.getFromTotalPrice(),

        checkoutCard.getToDates().get(0),
        checkoutCard.getToDates().get(1),
        checkoutCard.getToNights(),
        checkoutCard.getToPrice(),
        checkoutCard.getToTotalPrice()
    );
} else {
    priceDetails = """
        <tr>
            <td>%s – %s</td>
            <td style="text-align: right">%d Nights × € %d</td>
            <td style="text-align: right">€ %d</td>
        </tr>
    """.formatted(
        checkoutCard.getFromDates().get(0),
        checkoutCard.getFromDates().get(1),
        checkoutCard.getTotalNights(),
        checkoutCard.getFromPrice(),
        checkoutCard.getTotalPrice()
    );
}

        vars.put("firstname", reservation.getMainContactFirstName());
        vars.put("lastname",reservation.getMainContactLastName());
        vars.put("userMessage", userMessageBlock);
        vars.put("email",reservation.getEmail());
        vars.put("phone",reservation.getPhone());
        vars.put("guestsNo", guests.toString());
        vars.put("arrivalDate",reservation.getArrivalDate().toString());
        vars.put("departureDate", reservation.getDepartureDate().toString());
        vars.put("priceDetails", priceDetails);
        vars.put("totalNights", checkoutCard.getTotalNights().toString());
        vars.put("totalPrice", checkoutCard.getTotalPrice().toString());
        vars.put("reservationToken", reservation.getPublicToken().toString());

       
        String html = apply(template, vars);

    sendHtmlEmail(
                adminEmail,
                "New booking inquiry from " + reservation.getMainContactFirstName() + " " + reservation.getMainContactLastName(),
                html,
                reservation.getEmail()
        );
    }

    // 2. Confirmation email TO USER & translation

    private EmailContent translateMessage(String language, Contact contact) {
        Locale locale = Locale.forLanguageTag(language);

        String subject = messageSource.getMessage("email.subject", null, locale);
        String hello = messageSource.getMessage("email.hello", new Object[]{contact.getFirstName()}, locale);
        String thanks = messageSource.getMessage("email.thanks", null, locale);
        String yourMsg = messageSource.getMessage("email.yourMessage", null, locale);
        String regards = messageSource.getMessage("email.regards", null, locale);
        String signature = messageSource.getMessage("email.signature", null, locale);


        String template = loadTemplate("contact-confirmation");

        String html = apply(template, Map.of(
            "hello", hello,
            "thanks", thanks,
            "yourMessage",yourMsg,
            "userMessage", contact.getMessage(),
            "regards", regards,
            "signature", signature
    ));


    return new EmailContent(subject, html);

    }
    private EmailContent translateMessage(String language, Reservation reservation) {
        Locale locale = Locale.forLanguageTag(language);

        String bookingSubject = messageSource.getMessage("email.bookingSubject", null, locale);
        String hello = messageSource.getMessage("email.hello", new Object[]{reservation.getMainContactFirstName()}, locale);
        String thanksMessage = messageSource.getMessage("email.thanksMessage", null, locale);
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
        if (reservation.getMessage() != null && !reservation.getMessage().isBlank()) {
            userMessageBlock =
                "<div style=\"margin-top: 20px; padding: 15px; background: #f0f4f8; border-left: 4px solid #234361;\">" +
                "<strong>"+ yourMsg +":</strong>" +
                "<p>" + reservation.getMessage() + "</p>" +
                "</div>";
}
        String template = loadTemplate("checkout-confirmation");
        Integer guestsNo = reservation.getAdults() + reservation.getTeens() +  reservation.getChildren();
        CheckoutCard checkoutCard = checkoutService.build(reservation.getArrivalDate(), reservation.getDepartureDate(), guestsNo);
        String priceBreakdown;

    if (checkoutCard.isSplit()) {
    priceBreakdown = """
        <tr>
            <td>%s – %s</td>
            <td style="text-align: right">%d %s × € %d</td>
            <td style="text-align: right">€ %d</td>
        </tr>
        <tr>
            <td>%s – %s</td>
            <td style="text-align: right">%d %s × € %d</td>
            <td style="text-align: right">€ %d</td>
        </tr>
    """.formatted(
        checkoutCard.getFromDates().get(0),
        checkoutCard.getFromDates().get(1),
        checkoutCard.getFromNights(),
        nights,
        checkoutCard.getFromPrice(),
        checkoutCard.getFromTotalPrice(),

        checkoutCard.getToDates().get(0),
        checkoutCard.getToDates().get(1),
        checkoutCard.getToNights(),
        nights,
        checkoutCard.getToPrice(),
        checkoutCard.getToTotalPrice()
    );
} else {
    priceBreakdown = """
        <tr>
            <td>%s – %s</td>
            <td style="text-align: right">%d %s × € %d</td>
            <td style="text-align: right">€ %d</td>
        </tr>
    """.formatted(
        checkoutCard.getFromDates().get(0),
        checkoutCard.getFromDates().get(1),
        checkoutCard.getTotalNights(),
        nights,
        checkoutCard.getFromPrice(),
        checkoutCard.getTotalPrice()
    );
}


       Map<String, String> vars = new HashMap<>();

        vars.put("bookingSubject", bookingSubject);
        vars.put("hello", hello);
        vars.put("thanksMessage", thanksMessage);
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
        vars.put("arrivalDate", reservation.getArrivalDate().toString());
        vars.put("departureDate", reservation.getDepartureDate().toString());
        vars.put("guestsNo", guestsNo.toString());
        vars.put("priceBreakdown", priceBreakdown);
        vars.put("totalNights", checkoutCard.getTotalNights().toString());
        vars.put("totalPrice", checkoutCard.getTotalPrice().toString());

        String html = apply(template, vars);

    return new EmailContent(bookingSubject, html);

    }


public void sendConfirmationToUser(Contact contact) {
        EmailContent email = translateMessage(contact.getLanguage(), contact);
        sendHtmlEmail(
                contact.getEmail(),
                email.subject(),
                email.html(),
                contact.getEmail()
        );

}

public void sendCheckoutRecapToUser(Reservation reservation) {
        EmailContent email = translateMessage(reservation.getLanguage(), reservation);
        sendHtmlEmail(
                reservation.getEmail(),
                email.subject(),
                email.html(),
                reservation.getEmail()
        );
    }

}


