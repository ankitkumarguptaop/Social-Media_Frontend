import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 createChatService,
 listChatService
} from "../../services/chat.service";
import { CREATE, LIST } from "./chat.type";

export const listChat = createAsyncThunk(LIST, async (payload) => {
  const res = await listChatService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const createChat = createAsyncThunk(CREATE, async (payload) => {
  const res = await createChatService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});