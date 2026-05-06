package irrigation_system.backend.service;

import irrigation_system.backend.dto.WeatherForecastDayDto;
import irrigation_system.backend.dto.WeatherResponseDto;

import java.util.List;

public interface WeatherService {

    WeatherResponseDto getWeatherByCity(String city);

    List<WeatherForecastDayDto> getForecastByCity(String city);
}