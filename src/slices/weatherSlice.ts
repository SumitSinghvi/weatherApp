import { createSlice } from "@reduxjs/toolkit";

export type WeatherItems = {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvIndex: number;
    windSpeed: number;
    humidity: number;
    visibility: number;
    airQuality: number;
    weather: {
        description: string;
    };
    rainChance: number;
};

const initialState: WeatherItems[] = [{
    dt: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    uvIndex: 0,
    windSpeed: 0,
    humidity: 0,
    visibility: 0,
    airQuality: 0,
    weather: {
        description: "",
    },
    rainChance: 0,
}];

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeatherList: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const { setWeatherList } = weatherSlice.actions;

export default weatherSlice.reducer;
