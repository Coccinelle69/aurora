package com.aurora.AuroraApartment.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aurora.AuroraApartment.model.Reservation;



@Repository
public interface ReservationRepo extends JpaRepository<Reservation, Integer> {

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.arrivalDate < :departure
        AND r.departureDate > :arrival
    """)
    List<Reservation> findOverlappingReservations(
        @Param("arrival") LocalDate arrival,
        @Param("departure") LocalDate departure
    );
}
