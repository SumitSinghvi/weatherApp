import { createSlice } from "@reduxjs/toolkit";

export interface PrevWeatherItems {
  dt: string;
  temp: number;
  sunrise: string;
  sunset: string;
};

const initialState = {
    forecast: [
      {
        dt: '',
        temp: 0,
        sunrise: '05:54 AM',
        sunset: '05:44 PM',
      },
    ] as PrevWeatherItems[],
    tempUnit: 'celsius'
  };

const prevWeekTempSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setPrevWeekWeatherList (state, action) {
      state = action.payload;
      return state;
    },
    setPrevWeekTempUnitValues (state, action) {
      state.tempUnit = action.payload ? 'fahrenheit' : 'celsius';
      state.forecast = state.forecast.map((item) => {
        return {...item, temp: action.payload ? ((item.temp * 9/5) + 32) : ((item.temp -32 ) / (9/5))}     
      }) 
    },
  },
});

export const { setPrevWeekTempUnitValues, setPrevWeekWeatherList } = prevWeekTempSlice.actions;

export default prevWeekTempSlice.reducer;
