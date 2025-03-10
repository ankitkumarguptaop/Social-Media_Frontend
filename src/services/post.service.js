import axios from "axios";

export const listPostService = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, {
    withCredentials: true,
  });
};

export const listUserPostService = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/users`, {
    withCredentials: true,
  });
};

export const createPostService = async (payload) => {
  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, payload, {
    withCredentials: true,
  });
};

export const deletePostService = async (postId) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`, {
    withCredentials: true,
  });
};

export const updatePostService = async (payload, postId) => {
  await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};
