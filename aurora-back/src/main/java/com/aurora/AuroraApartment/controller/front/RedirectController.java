package com.aurora.AuroraApartment.controller.front;

import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RedirectController {

    @GetMapping("/reservation/confirm/{token}")
    public String confirmRedirect(@PathVariable UUID token) {
        return "redirect:/api/reservation/confirm/" + token;
    }

    @GetMapping("/reservation/cancel/{token}")
    public String cancelRedirect(@PathVariable UUID token) {
        return "redirect:/api/reservation/cancel/" + token;
    }

    
    @GetMapping("/payment/full/{reference}")
    public String payFull(@PathVariable String reference) {
        return "redirect:/api/payment/checkout/stripe/"
             + reference
             + "?status=FULL";
    }

    
    @GetMapping("/payment/partial/{reference}")
    public String payPartial(@PathVariable String reference) {
        return "redirect:/api/payment/checkout/stripe/"
             + reference
             + "?status=PARTIAL";
    }

     @GetMapping("/payment/deposit/{reference}")
    public String payDeposit(@PathVariable String reference) {
        return "redirect:/api/payment/checkout/stripe/"
             + reference
             + "?status=DEPOSIT";
    }
}

