import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 listMessageService,
 createMessageService
} from "../../services/message.service";
import { CREATE, LIST } from "./message.type";

export const listMessage = createAsyncThunk(LIST, async (payload) => {
  const res = await listMessageService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const createMessage = createAsyncThunk(CREATE, async (payload) => {
  const res = await createMessageService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});