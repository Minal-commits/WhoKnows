import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://play-lh.googleusercontent.com/QR6GPZ6_mI9jfHXj5dT8xO-xbO3es8O-vtkg6ziOJTNdToZtx0_rTBkLC_EWoH3qgbs' }} 
          style={styles.logo} 
        />
        <Text style={styles.appName}>WhoKnows</Text>
      </View>
      <Text style={styles.footerText}>Developed with ❤️ by Minal</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white', // Background color of the splash screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 26,
    color: 'black',
    fontWeight: '700',
  },
  footerText:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  }
});
