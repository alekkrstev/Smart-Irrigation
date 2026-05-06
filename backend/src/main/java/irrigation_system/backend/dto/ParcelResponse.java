package irrigation_system.backend.dto;

import irrigation_system.backend.model.ParcelPriority;

import java.time.LocalDate;

public record ParcelResponse(
        Long id,
        String name,
        String location,
        double size,
        String soilType,
        String irrigationSystem,
        String cropType,
        LocalDate lastIrrigation,
        String notes,
        ParcelPriority priority,
        Long userId
) {
}