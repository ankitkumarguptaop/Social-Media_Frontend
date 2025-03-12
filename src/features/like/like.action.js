import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addLikeOnCommentService,
  addLikeOnPostService,
  removeLikeOnCommentService,
  removeLikeOnPostService,
  listCommentLikeService,
  listPostLikeService,
} from "../../services/like.service";
import {
  ADD_LIKE_COMMENT,
  ADD_LIKE_POST,
  REMOVE_COMMENT_LIKE,
  REMOVE_POST_LIKE,
  LIST_COMMENT_LIKE,
  LIST_POST_LIKE,
} from "./like.type";

export const addLikeOnComment = createAsyncThunk(
  ADD_LIKE_COMMENT,
  async (payload) => {
    const res = await addLikeOnCommentService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const addlikeOnPost = createAsyncThunk(
  ADD_LIKE_POST,
  async (payload) => {
    const res = await addLikeOnPostService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const removeCommentLike = createAsyncThunk(
  REMOVE_COMMENT_LIKE,
  async (payload) => {
    const res = await removeLikeOnCommentService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const removePostLike = createAsyncThunk(
  REMOVE_POST_LIKE,
  async (payload) => {
    const res = await removeLikeOnPostService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const listPostLike = createAsyncThunk(
  LIST_POST_LIKE,
  async (payload) => {
    const res = await listPostLikeService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const listCommentLike = createAsyncThunk(
  LIST_COMMENT_LIKE,
  async (payload) => {
    const res = await listCommentLikeService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);
