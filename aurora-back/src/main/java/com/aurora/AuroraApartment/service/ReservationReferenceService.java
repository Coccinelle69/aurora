package com.aurora.AuroraApartment.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.aurora.AuroraApartment.model.ReservationSequence;
import com.aurora.AuroraApartment.repo.ReservationSequenceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationReferenceService {

    private final ReservationSequenceRepository sequenceRepo;

    @Transactional
    public String generateReference() {
        int year = LocalDate.now().getYear() % 100;
        ReservationSequence seq = sequenceRepo
            .findByYear(year)
            .orElseGet(() -> {
                ReservationSequence s = new ReservationSequence();
                s.setYear(year);
                s.setLastNumber(0);
                return s;
            });

        int next = seq.getLastNumber() + 1;
        seq.setLastNumber(next);
        sequenceRepo.save(seq);

        return String.format("AUR-%02d%02d", year, next);
    }
}
