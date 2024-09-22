import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RoundedCard = ({feelsLikeTemp}) => {
  return (
    <View style={styles.Wrapper}>
        <View style={styles.container}>
            <Text style={styles.ContainerTxt}>Feels Like</Text>
            <Text style={styles.ContainerBtmTxt}>{feelsLikeTemp}°</Text>
        </View>
    </View>
  )
}

export default RoundedCard

const styles = StyleSheet.create({
    Wrapper:{
        flex:1,
        alignItems: 'center',
    },
        container:{
        backgroundColor: '#f20000',
        height: 170,
        width: 170,
        borderRadius: 100,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    ContainerTxt:{  
        color: 'white', 
        fontWeight: '400', 
        fontSize: 24,
    },
    ContainerBtmTxt:{
        color: 'white', 
        fontWeight: '600', 
        fontSize: 35,
    }
})