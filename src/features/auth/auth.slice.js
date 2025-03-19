"use client";
import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./auth.action";

import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { socket } from "@/configs/socket";



const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
    logout: (state, action) => {
      Cookies.remove('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        enqueueSnackbar(action.error.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        Cookies.set("jwt", action.payload.user.token, {
          expires: 7,
          secure: true,
        });

        // socket.on("connect", () => {
        //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        // });
       
        state.isLoading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        console.log('✌️action --->', JSON.stringify(action));
        enqueueSnackbar(action.error.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
