"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  listCommentOnComment,
  listCommentOnPost,
  updateComment,
  deleteComment,
  addCommentOnComment,
  addCommentOnPost,
} from "./comment.action";

const initialState = {
  postComments: [],
  commmentComments: [],
  isLoading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCommentOnComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnComment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCommentOnPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnPost.fulfilled, (state, action) => {
        state.postComments = [...state.postComments, action.payload];
        state.isLoading = false;
      })
      .addCase(addCommentOnPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listCommentOnComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listCommentOnComment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(listCommentOnComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listCommentOnPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(listCommentOnPost.fulfilled, (state, action) => {
        state.postComments= [...state.postComments ,action.payload]
        state.isLoading = false;
      })
      .addCase(listCommentOnPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError } = commentSlice.actions;

export default commentSlice.reducer;
