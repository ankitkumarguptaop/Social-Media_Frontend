import axios from "axios";

export const listChatService = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`, {
    withCredentials: true,
  });
};

export const createChatService = async (payload) =>
  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`, payload, {
    withCredentials: true,
  });
