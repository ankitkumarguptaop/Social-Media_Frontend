import axios from "axios";

export const listPostService = async (payload) => {
  const { limit = 5, page = 1 } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

export const listUserPostService = async () => {
  const { limit = 5, page = 1 } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/users?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

export const createPostService = async (payload) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const deletePostService = async (postId) => {
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`,
    {
      withCredentials: true,
    }
  );
};

export const updatePostService = async (payload, postId) => {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};
