package irrigation_system.backend.service.impl;

import irrigation_system.backend.dto.WeatherForecastDayDto;
import irrigation_system.backend.dto.WeatherResponseDto;
import irrigation_system.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@SuppressWarnings("unchecked")

@Service
public class WeatherServiceImpl implements WeatherService {

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.current.url}")
    private String currentUrl;

    @Value("${openweather.forecast.url}")
    private String forecastUrl;

    private final WebClient webClient;

    public WeatherServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Override
    public WeatherResponseDto getWeatherByCity(String city) {
        Map<String, Object> response = webClient.get()
                .uri(currentUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null) {
            throw new RuntimeException("Weather data not found");
        }

        Map<String, Object> main = (Map<String, Object>) response.get("main");
        Map<String, Object> wind = (Map<String, Object>) response.get("wind");
        List<Map<String, Object>> weatherList =
                (List<Map<String, Object>>) response.get("weather");

        Map<String, Object> weather = weatherList.get(0);

        String cityName = (String) response.get("name");
        double temperature = ((Number) main.get("temp")).doubleValue();
        int humidity = ((Number) main.get("humidity")).intValue();
        String description = (String) weather.get("description");
        double windSpeed = ((Number) wind.get("speed")).doubleValue();

        return new WeatherResponseDto(
                cityName,
                temperature,
                humidity,
                description,
                windSpeed
        );
    }

    @Override
    public List<WeatherForecastDayDto> getForecastByCity(String city) {
        Map<String, Object> response = webClient.get()
                .uri(forecastUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null) {
            throw new RuntimeException("Forecast data not found");
        }

        List<Map<String, Object>> list =
                (List<Map<String, Object>>) response.get("list");

        Map<String, WeatherForecastDayDto> dailyForecast = new LinkedHashMap<>();

        for (Map<String, Object> item : list) {
            String dateTime = (String) item.get("dt_txt");

            if (!dateTime.contains("12:00:00")) {
                continue;
            }

            LocalDate date = LocalDate.parse(dateTime.substring(0, 10));

            Map<String, Object> main = (Map<String, Object>) item.get("main");

            List<Map<String, Object>> weatherList =
                    (List<Map<String, Object>>) item.get("weather");

            Map<String, Object> weather = weatherList.get(0);

            double temperature = ((Number) main.get("temp")).doubleValue();
            String description = (String) weather.get("description");

            String dayName = date.getDayOfWeek()
                    .getDisplayName(TextStyle.SHORT, Locale.forLanguageTag("mk"));

            dailyForecast.put(
                    date.toString(),
                    new WeatherForecastDayDto(dayName, temperature, description)
            );

            if (dailyForecast.size() == 5) {
                break;
            }
        }

        return new ArrayList<>(dailyForecast.values());
    }
}