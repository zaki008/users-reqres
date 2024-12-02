import { API_HOST } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  data: null,
  isError: null,
  isLoading: false,
  messageError: null,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthRedux: (state) => {
      state.data = null;
      state.isLoading = null;
      state.isError = false;
      state.messageError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRegister.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postRegister.rejected, (state, err) => {
      state.isError = true;
      state.isLoading = false;
      state.messageError = err.payload;
    });

    builder.addCase(postLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postLogin.rejected, (state, err) => {
      state.isError = true;
      state.isLoading = false;
      state.messageError = err.payload;
    });
  },
});

export const postRegister = createAsyncThunk(
  "postRegister",
  async (formData, thunkAPI) => {
    try {
      const data = await axios.post(`${API_HOST.baseApi}register`, formData);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const postLogin = createAsyncThunk(
  "postLogin",
  async (formData, thunkAPI) => {
    try {
      const data = await axios.post(`${API_HOST.baseApi}login`, formData);
      Cookies.set("tokenLogin", data.data.token, { expires: 7 });
      return data;
    } catch (err) {
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const { resetAuthRedux } = authSlice.actions;

export default authSlice.reducer;
