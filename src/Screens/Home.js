import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import RoundedCard from '../Components/RoundedCard';
import CardComponent from '../Components/CardComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CityContext } from '../../contexts/CityContext';
import WeeklyForecast from '../Components/WeekLyForecast';

const Home = ({ navigation }) => {
  const {
    temp, highTemp, lowTemp, aqi, uvIdx, windSpeed, humidity, sunSet, sunRise,feelsLike,
    city, visibility, cloudCoverage, airPressure, elevation
  } = useContext(CityContext);

  const [uvText, setUvText] = useState('');

  useEffect(() => {
    if (uvIdx >= 0 && uvIdx <= 2) {
      setUvText('Low');
    } else if (uvIdx >= 3 && uvIdx <= 5) {
      setUvText('Moderate');
    } else if (uvIdx >= 6 && uvIdx <= 7) {
      setUvText('High');
    } else if (uvIdx >= 8) {
      setUvText('Very High');
    } else {
      setUvText('');
    }
  }, [uvIdx]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.Wrapper}>
          <View style={styles.Navbar}>
            <View>
              <AntDesign name="man" size={24} color="#f20000" />
            </View>
            <Text style={styles.HeadText}>{city}</Text>
            <TouchableOpacity
              style={styles.iconCont}
              onPress={() => navigation.push('SearchScreen')}
            >
              <AntDesign name="search1" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.tempAndAirQualityText}>
              <TouchableOpacity style={styles.tempAndHighLowText}>
                <Text style={styles.tempText}>{temp}°</Text>
                <View style={styles.highLowTemp}>
                  <Text style={styles.highLowTempText}>H : {highTemp}°</Text>
                  <Text style={styles.highLowTempText}>L : {lowTemp}°</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.aqiContainer}>
                  <Text style={styles.aqiText}>Air Quality: {aqi}</Text>
                  <Text style={styles.aqiText}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uvIdxContainer}>
                  <Text style={styles.aqiText}>UV Index: {uvIdx}</Text>
                  <Text style={styles.aqiText}>{uvText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.HorizontalLine}></View>
          <View style={styles.elevationContainer}>
            <Text style={styles.visibilityText}>Elevation from Sea level:</Text>
            <Image style={styles.earthImage} source={require('../Components/assets/Elevation.png')} />
            <Text style={styles.ElevationTxt}>{elevation} feet</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.aqiAndHumidity}>
              <CardComponent
                topTxt={"WindSpeed"}
                iconContainer={<Image style={{ width: 150, height: 100 }} source={require('../Components/assets/WindSpeed.png')} />}
                btmTxt={`${windSpeed} km/hr`}
              />
              <CardComponent
                topTxt={"Humidity"}
                iconContainer={<Image style={{ width: 150, height: 100 }} source={require('../Components/assets/Humidity.png')} />}
                btmTxt={`${humidity}%`}
              />
            </View>
            <View style={styles.sunsetAndFeelsLike}>
              <CardComponent
                  topTxt={"Cloud Coverage"}
                  iconContainer={<Image style={{ width: 150, height: 100 }} source={require('../Components/assets/Cloud.png')} />}
                  btmTxt={`${cloudCoverage}%`} 
                />
              <CardComponent
                topTxt={"Air pressure"}
                iconContainer={<Image style={{ width: 120, height: 100 }} source={require('../Components/assets/AirPressure.png')} />}
                btmTxt={`${airPressure} mb`}
              />
            </View>
            <View style={styles.sunsetAndFeelsLike}>
              <CardComponent
                  topTxt={"Sunrise  "}
                  iconContainer={<Image style={{ width: 150, height: 100 }} source={require('../Components/assets/Sunrise.png')} />}
                  btmTxt={`${sunRise}`}
                />
              <CardComponent
                topTxt={"Sunset  "}
                iconContainer={<Image style={{ width: 150, height: 100 }} source={require('../Components/assets/Sunset.png')} />}
                btmTxt={`${sunSet}`}
              />
            </View>
            <View style={styles.visibilityAndFeelsLike}>
              <CardComponent
                topTxt={"Visibility"}
                iconContainer={<Image style={{ width: 150, height: 100 }} source={require('../Components/assets/Visibility.png')} />}
                btmTxt={`${visibility} km`}
              />
              <RoundedCard feelsLikeTemp={feelsLike} />
            </View>
            
            <WeeklyForecast />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  Wrapper: {
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    backgroundColor: "#000000",

  },
  Navbar: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  iconCont: {
    backgroundColor: '#f20000',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
  HeadText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  tempAndAirQualityText: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
  },
  tempAndHighLowText: {
    backgroundColor: '#ffffff',
    width: 170,
    height: 170,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 40,
  },
  highLowTemp: {
    flexDirection: 'row',
    gap: 5,
  },
  highLowTempText: {
    fontSize: 16,
    fontWeight: '500',
  },
  leftContainer: {
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aqiContainer: {
    paddingVertical: 20,
    borderRadius: 45,
    backgroundColor: "#1a1d1f",
    justifyContent: 'center',
  },
  aqiText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 30,
  },
  uvIdxContainer: {
    paddingVertical: 20,
    borderRadius: 45,
    backgroundColor: "#f20000",
    justifyContent: 'center',
  },
  HorizontalLine: {
    backgroundColor: '#2f3438',
    height: 3,
    width: '100%',
    marginBottom: 20,
  },
  bottomContainer: {
    gap: 25,
  },
  aqiAndHumidity: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  visibilityAndFeelsLike: {
    flexDirection: 'row',
    gap: 20,
  },
  sunsetAndFeelsLike: {
    flexDirection: 'row',
    gap: 20,
  },
  visibilityText:{
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
  earthImage:{
    width: '100%',
    height: 180,
    resizeMode: 'stretch',

  },
  elevationContainer:{
    backgroundColor: '#2f3438',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
  },
  ElevationTxt:{
    color: '#ffffff',
    fontSize: 35,
    fontWeight: '500',
  }
});

export default Home;