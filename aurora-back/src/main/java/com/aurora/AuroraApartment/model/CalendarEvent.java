package com.aurora.AuroraApartment.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@AllArgsConstructor
public class CalendarEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = true)
    private String location;
    private String description;
    @Column(nullable = false, name = "start_time")
    private LocalDate startTime;
    @Column(nullable = false, name = "end_time")
    private LocalDate endTime;
    @Column(nullable = true, name = "is_all_day")
    @Builder.Default
    private Boolean isAllDay=false;
}
