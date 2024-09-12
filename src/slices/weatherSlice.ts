import { createSlice } from "@reduxjs/toolkit";

export type Location = {
    city: string;
    country: string;
}

export type WeatherItems = {
  dt: string;
  sunrise: number;
  sunset: number;
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
      city: "", 
      country: "", 
    } as Location,
    forecast: [
      {
        dt: '',
        sunrise: 0,
        sunset: 0,
        temp: 0,
        uvIndex: 0,
        windSpeed: 0,
        humidity: 0,
        visibility: 0,
        airQuality: 0,
        description: "",
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
