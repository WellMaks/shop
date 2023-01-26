import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const initialState = {
  isLoggedIn: !!getCookie("token"), // check if token exists in cookies
  token: getCookie("token") || {}, // set token to the value of the cookie or an empty object
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    deAuthenticate: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    restoreAuthState: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { deAuthenticate, authenticate, restoreAuthState } =
  authSlice.actions;

export default authSlice.reducer;
