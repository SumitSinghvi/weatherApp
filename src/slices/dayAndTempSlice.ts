import { createSlice } from "@reduxjs/toolkit";

export type dayAndTemp = {
    day: string;
    temp: string;
}

const initialState: dayAndTemp = {
    day: "", 
    temp: "", 
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
    },
});

export const { setDay, setTemp } = dayAndTempSlice.actions;

export default dayAndTempSlice.reducer;
