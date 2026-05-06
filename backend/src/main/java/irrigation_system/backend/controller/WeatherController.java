package irrigation_system.backend.controller;

import irrigation_system.backend.dto.WeatherForecastDayDto;
import irrigation_system.backend.dto.WeatherResponseDto;
import irrigation_system.backend.service.WeatherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public WeatherResponseDto getWeather(@RequestParam String city) {
        return weatherService.getWeatherByCity(city);
    }

    @GetMapping("/forecast")
    public List<WeatherForecastDayDto> getForecast(@RequestParam String city) {
        return weatherService.getForecastByCity(city);
    }
}