import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '../slices/weatherSlice';
import dayAndTempSlice from '../slices/dayAndTempSlice';
import todayWeatherSlice from '../slices/todayWeatherSlice';
import hourAndTempSlice from '../slices/hourAndTempSlice';
import prevWeekTempSlice from '../slices/prevWeekTempSlice';

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    dayandtemp: dayAndTempSlice,
    hourandtemp: hourAndTempSlice,
    todayweather: todayWeatherSlice,
    prevweektemp: prevWeekTempSlice
  },
});

export default store;
