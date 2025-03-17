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
    addNewMessage: (state, action) => {
      state.messages=[...state.messages , action.payload];
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        console.log('✌️action --->' , JSON.stringify(action.payload));
        socket.emit("message-sender", {
          room: action.payload.messages.room_id ,
          message: action.payload.messages,
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

export const { removeError , addNewMessage} = messageSlice.actions;

export default messageSlice.reducer;
