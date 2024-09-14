import { createSlice } from "@reduxjs/toolkit";

export type dayAndTemp = {
    hour: string;
    temp: string;
}

const initialState: dayAndTemp = {
    hour: "", 
    temp: "", 
};

const hourAndTempSlice = createSlice({
  name: "dayAndTemp",
  initialState,
  reducers: {
    setHour(state, action) {
          state.hour = action.payload;
        },
    setHourTemp(state, action) {
          state.temp = action.payload;
        },
    },
});

export const { setHour, setHourTemp } = hourAndTempSlice.actions;

export default hourAndTempSlice.reducer;
