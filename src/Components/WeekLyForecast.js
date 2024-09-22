import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { CityContext } from '../../contexts/CityContext';

const WeeklyForecast = () => {
  const { weeklyForecast } = useContext(CityContext);

  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {weeklyForecast.map((item) => (
        <View key={item.date} style={styles.forecastItem}>
          <Text style={styles.date}>{item.date}</Text>
          <Image source={{ uri: `https:${item.icon}` }} style={styles.icon} />
          <Text style={styles.temperature}>
            {item.maxTemp}°C / {item.minTemp}°C
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 10
  },
  forecastItem: {
    flexDirection: 'col',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f20000',
    height: 120,
    borderRadius: 10
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  icon: {
    width: 40,
    height: 40,
  },
  condition: {
    fontSize: 16,
    color: 'white'
  },
  temperature: {
    fontSize: 16,
    color: 'white'
  },
});

export default WeeklyForecast;
