import axios from 'axios';
const apiKey = '0885508068604675bd1195507241409';
const forecastEndPoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.city}&days=7&aqi=yes&alerts=no`
const locationsEndPoint = params=> `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.city}`

const apiCall = async (endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const fetchWeatherForeCast = params=>{
    let forecastURL = forecastEndPoint(params);
    return apiCall(forecastURL);
}

export const fetchLocations = params=>{
    let locationURL = locationsEndPoint(params);
    return apiCall(locationURL);
}