import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signinUserService,
  signupUserService,
} from "../../services/auth.service";
import { SIGNIN, SIGNUP } from "./auth.type";

export const signUpUser = createAsyncThunk(SIGNUP, async (signUpData) => {
  const res = await signupUserService(signUpData);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const signInUser = createAsyncThunk(SIGNIN, async (signIndata) => {
  const res = await signinUserService(signIndata);
  const data = res.data;
  console.log("res data", data);
  return res;
});