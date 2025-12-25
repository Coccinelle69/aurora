package com.aurora.AuroraApartment.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
  name = "reservation_sequence",
  uniqueConstraints = @UniqueConstraint(columnNames = "year")
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationSequence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer year;

    @Column(name = "last_number", nullable = false)
    private Integer lastNumber;
}
