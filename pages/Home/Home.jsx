import { View } from "react-native";
import { s } from "./Home.style";
import { Txt } from "../../components/Txt/Txt";
import { WeatherBasic } from "../../components/WeatherBasic/WeatherBasic";
import { getWeatherInterpretation } from "../../utils/weather-utils";
import { WeatherAdvanced } from "../../components/WeatherAdvanced/WeatherAdvanced";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Home({ weather, city, onSubmitSearch }) {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <View style={s.container}>
      <View style={s.basic}>
        <WeatherBasic
          dailyWeather={weather.daily}
          city={city}
          interpretation={currentInterpretation}
          temperature={Math.round(currentWeather.temperature)}
        />
      </View>
      <View style={s.searchBar}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>
      <View style={s.advanced}>
        <WeatherAdvanced
          sunrise={weather.daily.sunrise[0].split("T")[1]}
          sunset={weather.daily.sunset[0].split("T")[1]}
          windspeed={currentWeather.windspeed}
        />
      </View>
    </View>
  );
}
