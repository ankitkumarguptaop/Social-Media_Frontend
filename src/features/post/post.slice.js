import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  updatePost,
  listPost,
  listUserPost,

} from "./post.action";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [state.posts, action.payload];
        state.isLoading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listPost.fulfilled, (state, action) => {
        if (state.posts?.rows) {
          state.posts = {
            ...state.posts,
            rows: [...state.posts.rows, ...action.payload.post.rows],
          };
        } else {
          state.posts = action.payload.post;
        }
        state.isLoading = false;
      })
      .addCase(listPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listUserPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(listUserPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError } = postSlice.actions;

export default postSlice.reducer;
