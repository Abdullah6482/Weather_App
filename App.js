import { s } from "./App.style";
import { SafeAreaProvider, SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { Home } from "./pages/Home/Home";
import { Alert, Button, ImageBackground } from "react-native";
import backgroundImg from "./assets/background.png"
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location"
import { useEffect, useState } from "react";
import { WeatherAPI } from "./api/weather";
import { useFonts } from "expo-font"
import { Txt } from "./components/Txt/Txt";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Forecasts } from "./pages/Forecasts/Forecasts";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator()
const navTheme = {
  colors: {
    background: 'transparent'
  }
}


export default function App() {
  const [coordinates, setCoordinates] = useState()
  const [weather, setWeather] = useState()
  const [city, setCity] = useState()

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf")
  })
  //console.log(isFontLoaded)
  useEffect(() => {
    getUserCoordinates()
  }, [])

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates)
      fetchCityByCoords(coordinates)
    }
  }, [coordinates])

  async function fetchWeatherByCoords(coords) {
    try {
      const weatherResponse = await WeatherAPI.fetchWeatherByCoords(coords)
      setWeather(weatherResponse); // Update the weather state here
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  async function fetchCityByCoords(coords) {
    const cityResponse = await WeatherAPI.fetchCityByCoords(coords);
    setCity(cityResponse);
  }

  async function fetchCoordsByCity(city) {
    try {
      const coordsResponse = await WeatherAPI.fetchCoordsByCity(city);
      setCoordinates(coordsResponse);
    } catch (error) {
      Alert.alert("Oppsi", error)
    }
  }


  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync()
    if (status === "granted") {
      const location = await getCurrentPositionAsync()
      setCoordinates({ lat: location.coords.latitude, lng: location.coords.longitude })
    } else {
      setCoordinates({ lat: "48.85", lng: "2.35" })
    }
  }






  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground imageStyle={s.img} style={s.img_background} source={backgroundImg}>
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && weather &&
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <Stack.Screen name="Home">
                  {() => (
                    <>
                      <Home city={city} weather={weather} onSubmitSearch={fetchCoordsByCity} />
                    </>
                  )}
                </Stack.Screen>
                <Stack.Screen name="Forecasts" component={Forecasts} />
              </Stack.Navigator>
            }
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
