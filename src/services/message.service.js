import axios from "axios";

export const listMessageService = async (payload) => {
  const { chatId } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/chats/${chatId}`,
    {
      withCredentials: true,
    }
  );
};

export const createMessageService = async (payload) =>{
  const { chatId } = payload;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/chats/${chatId}`,
    payload,
    {
      withCredentials: true,
    }
  
  );
}