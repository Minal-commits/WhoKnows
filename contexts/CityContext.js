import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeatherForeCast } from '../api/weather';
import axios from 'axios';
export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [foreCast, setForeCast] = useState({});
  const [temp, setTemp] = useState(0);
  const [highTemp, setHighTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [aqi, setAqi] = useState(0);
  const [uvIdx, setUvIdx] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [sunSet, setSunSet] = useState('00:00');
  const [sunRise, setSunRise] = useState('00:00');
  const [feelsLike, setFeelsLike] = useState(0);
  const [savedLocations, setSavedLocations] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [cloudCoverage, setCloudCoverage] = useState(0);
  const [airPressure, setAirPressure] = useState(0);
  const [elevation, setElevation] = useState(0);



  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load saved city
        const storedCity = await AsyncStorage.getItem('city');
        if (storedCity) {
          setCity(storedCity);
          selectCity(storedCity);
        }

        // Load saved locations
        const storedLocations = await AsyncStorage.getItem('savedLocations');
        if (storedLocations) {
          setSavedLocations(JSON.parse(storedLocations));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadInitialData();
  }, []);

  const selectCity = async (selectedCity) => {
    setCity(selectedCity);
    try {
      await AsyncStorage.setItem('city', selectedCity);
      
      if (selectedCity) {
        const data = await fetchWeatherForeCast({ city: selectedCity });
        // console.log(data)
        if (data) {
          const apiCall = async (data) => {
              const options = {
                  method: 'GET',
                  url: `https://api.open-elevation.com/api/v1/lookup?locations=${data.location.lat},${data.location.lon}`
              };
              try {
                  const response = await axios.request(options);
                  // console.log(response.data)
                  return response.data.results[0].elevation;  // response.data contains the parsed JSON
              } catch (error) {
                  console.log(error);
                  return null;
              }
          };
      
          // Since apiCall is an async function, you need to await the result
          apiCall(data).then(elevation => {
              setElevation(elevation);
          });

          const currentWeather = data.current;
          const forecastDays = data.forecast?.forecastday || [];

          setForeCast(data);
          setTemp(currentWeather.temp_c); 
          setHighTemp(forecastDays[0]?.day?.maxtemp_c || 0); 
          setLowTemp(forecastDays[0]?.day?.mintemp_c || 0); 
          setAqi(currentWeather.air_quality['us-epa-index']); 
          setUvIdx(currentWeather.uv); 
          setWindSpeed(currentWeather.wind_kph); 
          setHumidity(currentWeather.humidity); 
          setSunSet(forecastDays[0]?.astro?.sunset || '00:00'); 
          setSunRise(forecastDays[0]?.astro?.sunrise || '00:00');
          setVisibility(currentWeather.vis_km);
          setFeelsLike(currentWeather.feelslike_c);

          setCloudCoverage(currentWeather.cloud);
          setAirPressure(currentWeather.pressure_mb);
          
          // Update the weekly forecast with the next 7 days
          setWeeklyForecast(forecastDays.map(day => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon
          })));
        }
      } else {
        setForeCast({});
      }
    } catch (error) {
      console.error('Error saving city to AsyncStorage:', error);
    }
  };

  const updateSavedLocations = async (newLocations) => {
    try {
      await AsyncStorage.setItem('savedLocations', JSON.stringify(newLocations));
      setSavedLocations(newLocations);
    } catch (error) {
      console.error('Error saving locations to AsyncStorage:', error);
    }
  };

  return (
    <CityContext.Provider
      value={{
        city,
        selectCity,
        foreCast,
        temp,
        highTemp,
        lowTemp,
        aqi,
        uvIdx,
        windSpeed,
        visibility,
        humidity,
        sunSet,
        sunRise,
        feelsLike,
        savedLocations,
        cloudCoverage,
        airPressure,
        elevation,
        setSavedLocations: updateSavedLocations,
        weeklyForecast // Added the weekly forecast state here
        
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
