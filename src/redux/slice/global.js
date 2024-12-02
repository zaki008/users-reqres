import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = globalSlice.actions;
export default globalSlice.reducer;
