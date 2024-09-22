import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CardComponent = ({topTxt, iconContainer, btmTxt}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.topTxt}>{topTxt}</Text>
            <View style={styles.iconContainer}>
              {iconContainer}
            </View>
            <Text style={styles.btmTxt}>{btmTxt}</Text>
    </TouchableOpacity>
  )
}

export default CardComponent

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#2f3438',
        borderRadius: 10,
        width: '48%',
        height: 200,
        padding: 10,
    },
    topTxt:{
        color: 'white', 
        fontWeight: '500', 
        fontSize: 16, 
        paddingBottom: 10
    },
    iconContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    btmTxt:{
        color: 'white', 
        fontWeight: '500', 
        fontSize: 22, 
        paddingBottom: 10,
        paddingTop: 5
    }
})