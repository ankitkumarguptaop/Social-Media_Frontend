import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  listPostService,
  listUserPostService,
  deletePostService,
  updatePostService,
  createPostService,
} from "../../services/post.service";
import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  LIST_POST,
  LIST_USER_POST,

} from "./post.type";

export const createPost = createAsyncThunk(CREATE_POST, async (payload) => {
  const res = await createPostService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const updatePost = createAsyncThunk(UPDATE_POST, async (payload) => {
  const res = await updatePostService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const deletePost = createAsyncThunk(DELETE_POST, async (payload) => {
  const res = await deletePostService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const listPost = createAsyncThunk(LIST_POST, async (payload) => {
  const res = await listPostService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});
export const listUserPost = createAsyncThunk(
  LIST_USER_POST,
  async (payload) => {
    const res = await listUserPostService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

