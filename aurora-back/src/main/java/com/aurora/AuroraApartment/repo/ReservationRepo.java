package com.aurora.AuroraApartment.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aurora.AuroraApartment.model.Reservation;



@Repository
public interface ReservationRepo extends JpaRepository<Reservation, Integer> {


    @Query("""
        SELECT r FROM Reservation r 
        WHERE r.arrivalDate < :departure
        AND r.departureDate > :arrival
        AND r.status = 'CONFIRMED'
    """)
    List<Reservation> findOverlappingReservations(LocalDate arrival, LocalDate departure);

      @Query("""
        SELECT r FROM Reservation r
        WHERE r.BalanceDueAt < :today
        AND r.reminderSent = false
        AND r.status = 'PARTIALLY_PAID'
    """)
    List<Reservation> findAllBalanceDueToday(LocalDate today);
    
    Optional<Reservation> findByPublicToken(UUID publicToken);
    Optional<Reservation> findByReservationReference(String reservationReference);
    Optional<Reservation> findByArrivalDate(LocalDate arrivalDate);

    
}
