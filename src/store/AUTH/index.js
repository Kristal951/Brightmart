import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/SignUp",
      formData,
      { withCredentials: true }
    );
    return res.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    { withCredentials: true }
  );
  return res.data;
});

export const logOut = createAsyncThunk("/auth/logout", async () => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/Logout",
    {},
    { withCredentials: true }
  );
  return res.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const res = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    { withCredentials: true,
      headers:{
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      },
      Expires: '0'
     }
  );
  return res.data;
});

const AUTH = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.status === 'success' ? action.payload.user : null;
        state.isAuthenticated = action.payload.status === 'success';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.fulfilled, (state)=>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.status === 'success' ? action.payload.user : null;
        state.isAuthenticated = action.payload.status === 'success';
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = AUTH.actions;
export default AUTH.reducer;
