package irrigation_system.backend.dto;

import java.time.LocalDate;


import irrigation_system.backend.model.ParcelPriority;


public record ParcelRequest(
        String name,
        String location,
        Double size,
        String soilType,
        String irrigationSystem,
        String cropType,
        LocalDate lastIrrigation,
        String notes,
        ParcelPriority priority
) {
}