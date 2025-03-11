"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  listCommentLike,
  listPostLike,
  removeCommentLike,
  removePostLike,
  addLikeOnComment,
  addlikeOnPost,
} from "./like.action";

const initialState = {
  postLikes: [],
  isLoading: false,
  error: null,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLikeOnComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLikeOnComment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addLikeOnComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addlikeOnPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addlikeOnPost.fulfilled, (state, action) => {
        state.postLikes=[...state.postLikes ,  action.payload]
        state.isLoading = false;
      })
      .addCase(addlikeOnPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listCommentLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listCommentLike.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(listCommentLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listPostLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listPostLike.fulfilled, (state, action) => {
        state.postLikes=[...state.postLikes ,  action.payload]
        state.isLoading = false;
      })
      .addCase(listPostLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeCommentLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCommentLike.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeCommentLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removePostLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePostLike.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removePostLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError } = likeSlice.actions;

export default likeSlice.reducer;
