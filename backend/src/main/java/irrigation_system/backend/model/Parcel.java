package irrigation_system.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDate;

@Entity
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private Double size;

    @Enumerated(EnumType.STRING)
    private ParcelPriority priority = ParcelPriority.MEDIUM;

    private String soilType;
    private String irrigationSystem;

    private String cropType;
    private LocalDate lastIrrigation;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Parcel() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public Double getSize() {
        return size;
    }

    public ParcelPriority getPriority() {
        return priority;
}
    public void setPriority(ParcelPriority priority) {
        this.priority = priority;
    }

    public String getSoilType() {
        return soilType;
    }

    public String getIrrigationSystem() {
        return irrigationSystem;
    }

    public String getCropType() {
        return cropType;
    }

    public LocalDate getLastIrrigation() {
        return lastIrrigation;
    }

    public String getNotes() {
        return notes;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public void setIrrigationSystem(String irrigationSystem) {
        this.irrigationSystem = irrigationSystem;
    }

    public void setCropType(String cropType) {
        this.cropType = cropType;
    }

    public void setLastIrrigation(LocalDate lastIrrigation) {
        this.lastIrrigation = lastIrrigation;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setUser(User user) {
        this.user = user;
    }
}