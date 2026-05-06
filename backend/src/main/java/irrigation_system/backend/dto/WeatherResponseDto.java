package irrigation_system.backend.dto;

public class WeatherResponseDto {

    private String city;
    private double temperature;
    private int humidity;
    private String description;
    private double windSpeed;

    public WeatherResponseDto() {
    }

    public WeatherResponseDto(String city, double temperature, int humidity, String description, double windSpeed) {
        this.city = city;
        this.temperature = temperature;
        this.humidity = humidity;
        this.description = description;
        this.windSpeed = windSpeed;
    }

    public String getCity() {
        return city;
    }

    public double getTemperature() {
        return temperature;
    }

    public int getHumidity() {
        return humidity;
    }

    public String getDescription() {
        return description;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }
}