import { createSlice, current } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  updatePost,
  listPost,
  listUserPost,
} from "./post.action";
import { enqueueSnackbar } from "notistack";

const initialState = {
  userPosts: [],
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
    removePosts :(state, action)=>{
      state.posts=[];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = {
          ...state.posts,
          count: state.posts.count + 1,
          rows: [...state.posts.rows, { ...action.payload.post, images: [] }],
        };
        enqueueSnackbar("Post Added Sucessfuly", {
          variant: "success",
          autoHideDuration: 5000,
        });
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
      })
      .addCase(listPost.fulfilled, (state, action) => {
        if (state.posts?.rows ) {
          state.posts = {
            ...state.posts,
            rows: [...state.posts.rows, ...action.payload.post.rows],
          };
        } else {
          state.posts = action.payload.post;
        }
      })
      .addCase(listPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(listUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listUserPost.fulfilled, (state, action) => {
        state.userPosts= action.payload.post;
        state.isLoading = false;
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

export const { removeError ,removePosts} = postSlice.actions;

export default postSlice.reducer;
