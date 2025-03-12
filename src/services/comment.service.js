import axios from "axios";

export const addCommentOnPostService = async (payload) => {
  const { postId } = payload;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/posts/${postId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const addCommentOnCommentService = async (payload) => {
  const { commentId } = payload;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${commentId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const deleteCommmentService = async (payload) => {
  const { commentId } = payload;
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${commentId}`,
    {
      withCredentials: true,
    }
  );
};

export const updateCommentService = async (payload) => {
  const { commentId } = payload;
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${commentId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const listCommentOnPostService = async (payload) => {
  const { postId, page = 1, limit = 10 } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/posts/${postId}?page=${page}&limit=${limit}`,
    { withCredentials: true }
  );
};

export const listCommentOnCommentService = async (payload) => {
  const { commentId, page, limit } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${commentId}?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};
