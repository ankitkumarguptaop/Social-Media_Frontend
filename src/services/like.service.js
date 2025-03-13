import axios from "axios";

export const addLikeOnPostService = async (payload) => {
  const { postId } = payload;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/posts/${postId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const removeLikeOnPostService = async (payload) => {
  const { postId } = payload;
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/posts/${postId}`,
    {
      withCredentials: true,
    }
  );
};

export const addLikeOnCommentService = async (payload) => {
  const { commentId } = payload;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/comments/${commentId}`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const removeLikeOnCommentService = async (payload) => {
  const { commentId } = payload;
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/comments/${commentId}`,
    {
      withCredentials: true,
    }
  );
};

export const listCommentLikeService = async (payload) => {
  const { commentId } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/comments/${commentId}`,
    {
      withCredentials: true,
    }
  );
};

export const listPostLikeService = async (payload) => {
  const { postId } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/posts/${postId}`,
    {
      withCredentials: true,
    }
  );
};
