import React, { useContext, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { debounce } from 'lodash';
import { fetchLocations } from '../../api/weather'; // Adjust the path
import { CityContext } from '../../contexts/CityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const { selectCity, savedLocations, setSavedLocations } = useContext(CityContext); // Access selectCity and savedLocations from context
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Track if the user is searching

  // Load saved locations from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSavedLocations = async () => {
      try {
        const storedLocations = await AsyncStorage.getItem('savedLocations');
        if (storedLocations) {
          setSavedLocations(JSON.parse(storedLocations));
        }
      } catch (error) {
        console.error('Error loading saved locations from AsyncStorage:', error);
      }
    };

    loadSavedLocations();
  }, []);

  const handleCitySelection = async (city) => {
    if (!city || city.trim() === '') {
      console.error('City name cannot be empty.');
      return; // Exit the function if the input is empty or contains only whitespace
    }

    selectCity(city); // Update city using context function
    await handelAddsavedLocation(city); // Add city to saved locations and store in AsyncStorage
    navigation.pop(); // Go back to Home screen
  };

  const handleInputChange = (value) => {
    if (value.trim() === '') {
      setSearchText('');
      setLocations([]);
      setIsSearching(false); // Stop searching for empty input
      return;
    }

    setSearchText(value);
    setIsSearching(true); // Set searching to true when the user starts typing

    if (value.length >= 3) {
      fetchLocations({ city: value }).then((data) => {
        setLocations(data || []);
        setIsSearching(false); // Stop searching once results are fetched
      });
    }
  };

  const debouncedHandleInputChange = useCallback(debounce(handleInputChange, 1200), []);

  const handelAddsavedLocation = async (location) => {
    const updatedLocations = [...savedLocations, location];

    try {
      await AsyncStorage.setItem('savedLocations', JSON.stringify(updatedLocations)); // Save locations to AsyncStorage
      setSavedLocations(updatedLocations);
    } catch (error) {
      console.error('Error saving locations to AsyncStorage:', error);
    }
  };

  const handleSavedLocationPress = (location) => {
    selectCity(location);
    navigation.pop();
  };

  const handleDeleteLocation = async (locationToDelete) => {
    const updatedLocations = savedLocations.filter(location => location !== locationToDelete);

    try {
      await AsyncStorage.setItem('savedLocations', JSON.stringify(updatedLocations)); // Update AsyncStorage after deleting
      setSavedLocations(updatedLocations);
    } catch (error) {
      console.error('Error deleting location from AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.iptContainer}>
          <View style={styles.iptAndBack}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons name="chevron-back-sharp" size={24} color="#f20000" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Search for a city"
              placeholderTextColor="#ffffff"
              onChangeText={debouncedHandleInputChange}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={styles.iconCont}
            onPress={() => handleCitySelection(searchText)}
            disabled={searchText.trim() === ''} // Disable the button if the input is empty
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {isSearching && locations.length === 0 ? (
          <View>
            <Text style={styles.emptyText}>Searching...</Text>
          </View>
        ) : locations.length > 0 ? (
          <View style={styles.searchCont}>
            {locations.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.locitems}
                onPress={() => handleCitySelection(item.name)}
              >
                <Text style={styles.locText}>
                  {item.name}, {item.country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        <View style={styles.body}>
          {savedLocations.length > 0 && (
            <View>
              {savedLocations.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleSavedLocationPress(item)}>
                  <View style={styles.SavedLocContainer}>
                    <Text style={styles.SavedLocText}>{item}</Text>
                    <TouchableOpacity onPress={() => handleDeleteLocation(item)}>
                      <AntDesign name="delete" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.divider}></View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    height: '100%',
    paddingTop: 20,
  },
  iptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 20,
  },
  iptAndBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCont: {
    backgroundColor: '#f20000',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchCont: {
    width: '100%',
    gap: 6,
  },
  locitems: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '11%',
    paddingVertical: 10,
  },
  locText: {
    color: 'white',
    fontSize: 20,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  body: {
    height: '80%',
    marginTop: 30,
  },
  SavedLocContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  SavedLocText: {
    color: 'white',
    fontSize: 20,
  },
  savedLocationsHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#f20000',
    marginVertical: 10,
  },
});
