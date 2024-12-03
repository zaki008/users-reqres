import { API_HOST } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  isError: null,
  isLoading: false,
  detailUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {};
      state.isError = false;
      state.isLoading = false;
    },
    updateData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(getDetailUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDetailUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detailUser = action.payload;
    });
    builder.addCase(getDetailUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const getUsers = createAsyncThunk(
  "getUsers",
  async (params, thunkAPI) => {
    try {
      const data = await axios.get(
        `${API_HOST.baseApi}users?page=${params.page || 1}&per_page=${
          params.per_page || 10
        }`
      );
      return data.data;
    } catch (err) {
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getDetailUser = createAsyncThunk(
  "getDetailUser",
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(`${API_HOST.baseApi}users/${id}`);
      return data.data;
    } catch (err) {
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const { updateData, resetData } = userSlice.actions;

export default userSlice.reducer;
