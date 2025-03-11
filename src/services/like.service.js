import axios from "axios";

export const addLikeOnPostService = async (data) => {
  const { postId } = data;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/posts/${postId}`,
    data,
    {
      withCredentials: true,
    }
  );
};

export const removeLikeOnPostService = async (data) => {
  const { postId } = data;
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/posts/${postId}`,
    {
      withCredentials: true,
    }
  );
};

export const addLikeOnCommentService = async (data) => {
  const { commentId } = data;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/comments/${commentId}`,
    data,
    {
      withCredentials: true,
    }
  );
};

export const removeLikeOnCommentService = async (data) => {
  const { commentId } = data;
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/comments/${commentId}`,
    {
      withCredentials: true,
    }
  );
};

export const listCommentLikeService = async (data) => {
  const { postId } = data;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/comments/${postId}`,

    {
      withCredentials: true,
    }
  );
};

export const listPostLikeService = async (data) => {
  const { postId } = data;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/posts/${postId}`,
    {
      withCredentials: true,
    }
  );
};
