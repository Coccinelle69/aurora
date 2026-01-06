package com.aurora.AuroraApartment.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Reservation;



@Repository
public interface ReservationRepo extends JpaRepository<Reservation, Integer> {


    @Query("""
        SELECT r FROM Reservation r 
        WHERE r.arrivalDate < :departure
        AND r.departureDate > :arrival
        AND r.status IN :statuses
    """)
    List<Reservation> findOverlappingReservations(LocalDate arrival, LocalDate departure, List<ReservationStatus> statuses);

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.reminderDueAt = :today
        AND r.reminderSent = false
        AND r.status = :status
    """)
    List<Reservation> findAllRemindersDueToday(LocalDate today, ReservationStatus status);

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.balanceDueAt = :today
        AND r.reminderSent = true
        AND r.cancellationEmailSent = false
        AND r.status = :status
    """)
    List<Reservation> findAllBalancesDueToday(LocalDate today, ReservationStatus status);
    
    Optional<Reservation> findByPublicToken(UUID publicToken);
    Optional<Reservation> findByReservationReference(String reservationReference);
    Reservation findByArrivalDate(LocalDate arrivalDate);

    
}
