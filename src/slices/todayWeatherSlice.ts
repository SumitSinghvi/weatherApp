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
      city: "", 
      country: "", 
    } as Location,
    forecast: [
      {
        dt: '',
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
    tempUnit: 'celsius',
    astro: {
      sunrise: '0',
      sunset: '0',
    }
  };

const todayWeatherSlice = createSlice({
  name: "weatherToday",
  initialState,
  reducers: {
    setTodayWeatherList (state, action) {
      state = action.payload;
      return state;
    },
    setTodayTempUnitValues (state, action) {
      state.tempUnit = action.payload ? 'fahrenheit' : 'celsius';
      state.forecast = state.forecast.map((item) => {
        return {...item, temp: action.payload ? ((item.temp * 9/5) + 32) : ((item.temp -32 ) / (9/5))}     
      }) 
    },
  },
});

export const { setTodayWeatherList, setTodayTempUnitValues } = todayWeatherSlice.actions;

export default todayWeatherSlice.reducer;
