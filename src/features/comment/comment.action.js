import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCommentOnCommentService,
  addCommentOnPostService,
  deleteCommmentService,
  updateCommentService,
  listCommentOnCommentService,
  listCommentOnPostService,
} from "../../services/comment.service";
import {
  LIST_COMMENT_ON_COMMENT,
  LIST_COMMENT_ON_POST,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT_ON_COMMENT,
  ADD_COMMENT_ON_POST,
} from "./comment.type";

export const addCommentOnComment = createAsyncThunk(
  ADD_COMMENT_ON_COMMENT,
  async (payload) => {
    const res = await addCommentOnCommentService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const addCommentOnPost = createAsyncThunk(
  ADD_COMMENT_ON_POST,
  async (payload) => {
    const res = await addCommentOnPostService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  DELETE_COMMENT,
  async (payload) => {
    const res = await deleteCommmentService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const updateComment = createAsyncThunk(
  UPDATE_COMMENT,
  async (payload) => {
    const res = await updateCommentService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const listCommentOnPost = createAsyncThunk(
  LIST_COMMENT_ON_POST,
  async (payload) => {
    const res = await listCommentOnPostService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const listCommentOnComment = createAsyncThunk(
  LIST_COMMENT_ON_COMMENT,
  async (payload) => {
    const res = await listCommentOnCommentService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);
