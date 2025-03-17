"use client";
import { createSlice } from "@reduxjs/toolkit";
import { createChat, listChat } from "./chat.action";
import { enqueueSnackbar } from "notistack";
import { socket } from "../../configs/socket";
const initialState = {
  chats: [],
  selectedChat:null,
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
    setSelectedChat:(state ,action)=>{
      state.selectedChat =action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.selectedChat =action.payload.chat
        state.isLoading = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listChat.fulfilled, (state, action) => {
        state.chats =action.payload.chats.users
        const chatIds = action.payload.chats.allCreatedChats.map((chat) => chat.id);
        socket.emit("join-chats", chatIds);
        state.isLoading = false;
      })
      .addCase(listChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError  ,setSelectedChat} = chatSlice.actions;

export default chatSlice.reducer;
