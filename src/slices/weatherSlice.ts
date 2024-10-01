import { createSlice } from "@reduxjs/toolkit";

export type Location = {
    city: string;
    country: string;
}

export type WeatherItems = {
  dt: string;
  sunrise: string;
  sunset: string;
  temp: number;
  uvIndex: number;
  windSpeed: number;
  humidity: number;
  visibility: number;
  airQuality: number;
  description: string;
  rainChance: number;
};

const initialState = {
    location: {
      city: "New York", 
      country: "USA", 
    } as Location,
    forecast: [
      {
        dt: '',
        sunrise: '05:44 AM',
        sunset: '05:44 PM',
        temp: 0,
        uvIndex: 0,
        windSpeed: 0,
        humidity: 0,
        visibility: 0,
        airQuality: 0,
        description: "Sunny",
        rainChance: 0,
      },
    ] as WeatherItems[],
    tempUnit: 'celsius'
  };

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherList (state, action) {
      state = action.payload;
      return state;
    },
    setTempUnitValues (state, action) {
      state.tempUnit = action.payload ? 'fahrenheit' : 'celsius';
      state.forecast = state.forecast.map((item) => {
        return {...item, temp: action.payload ? ((item.temp * 9/5) + 32) : ((item.temp -32 ) / (9/5))}     
      }) 
    },
  },
});

export const { setWeatherList, setTempUnitValues } = weatherSlice.actions;

export default weatherSlice.reducer;
