"use client";
import { createSlice } from "@reduxjs/toolkit";
import { listMessage, createMessage } from "./message.action";
import { enqueueSnackbar } from "notistack";
import { socket } from "@/configs/socket";

const initialState = {
  messages: [],
  selectedChat: null,
  isLoading: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        socket.emit("message-sender", {
          room: action.payload.data.room ,
          message: action.payload.data.message,
        });
        state.isLoading = false;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listMessage.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.isLoading = false;
      })
      .addCase(listMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError } = messageSlice.actions;

export default messageSlice.reducer;
