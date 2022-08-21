import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 10,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    increaseBy: (state, data) => {
      state.value += data.payload;
    },
    decreaseBy: (state, data) => {
      state.value -= data.payload;
    }
  }
});

export const { increment, decrement, increaseBy, decreaseBy } = counterSlice.actions;

export default counterSlice.reducer;
