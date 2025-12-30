package com.aurora.AuroraApartment.repo;

import java.util.Optional;

import com.aurora.AuroraApartment.model.ReservationSequence;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservationSequenceRepo extends JpaRepository <ReservationSequence, Long>  {
    Optional<ReservationSequence> findByYear(Integer year);
}
