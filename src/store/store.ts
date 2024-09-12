import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '../slices/weatherSlice';
import dayAndTempSlice from '../slices/dayAndTempSlice';

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    dayandtemp: dayAndTempSlice,
  },
});

export default store;
