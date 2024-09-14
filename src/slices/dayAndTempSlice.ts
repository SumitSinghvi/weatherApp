import { createSlice } from "@reduxjs/toolkit";

export type dayAndTemp = {
    day: string;
    temp: string;
    date: string;
  }

const initialState: dayAndTemp = {
    day: "", 
    temp: "", 
    date: '',
};

const dayAndTempSlice = createSlice({
  name: "dayAndTemp",
  initialState,
  reducers: {
    setDay(state, action) {
          state.day = action.payload;
        },
    setTemp(state, action) {
          state.temp = action.payload;
        },
    setDate(state, action) {
      state.date = action.payload;
    },
  }
});

export const { setDay, setTemp, setDate } = dayAndTempSlice.actions;

export default dayAndTempSlice.reducer;
