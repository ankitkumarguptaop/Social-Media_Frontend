import axios from "axios";

export const listPostService = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
};
export const listUserPostService = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/users`);
};

export const createPostService = async (payload) => {
  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, payload);
};

export const deletePostService = async (postId) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`);
};

export const updatePostService = async (payload, postId) => {
  await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`,
    payload
  );
};
