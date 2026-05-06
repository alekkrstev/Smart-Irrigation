package irrigation_system.backend.dto;

public class WeatherForecastDayDto {
    private String day;
    private double temperature;
    private String description;

    public WeatherForecastDayDto() {
    }

    public WeatherForecastDayDto(String day, double temperature, String description) {
        this.day = day;
        this.temperature = temperature;
        this.description = description;
    }

    public String getDay() {
        return day;
    }

    public double getTemperature() {
        return temperature;
    }

    public String getDescription() {
        return description;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}