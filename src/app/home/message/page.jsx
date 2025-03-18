"use client";
import React, { useEffect, useState } from "react";
import style from "./message.module.css";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createChat, listChat } from "@/features/chat/chat.action";
import MessageBox from "@/components/message-box/message";
import { removePosts } from "@/features/post/post.slice";
const Message = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [currentChatUser, setCurrentChatUser] = useState(null);
  console.log("✌️currentUser --->", currentUser);
  console.log("✌️selectedChat --->", selectedChat);
  console.log("✌️chats --->", chats);

  useEffect(() => {
    dispatch(listChat());
    dispatch(removePosts());
  }, []);
  return (
    <Box className={style["message-container"]}>
      <Box className={style["left-container"]}>
        <Box className={style["user-name"]}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              padding: "36px 24px 12px",
            }}
          >
            {currentUser?.user?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px 10px",
          }}
        >
          <Typography>Message</Typography>
          <Typography color="#737373" fontSize={"14px"}>Requests</Typography>
        </Box>
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 24px",
                  cursor: "pointer",
                }}
                key={chat.id}
                onClick={() => {
                  setCurrentChatUser(chat);
                  dispatch(
                    createChat({
                      member1: chat.id,
                      member2: currentUser.user.id,
                    })
                  );
                }}
              >
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  src={`${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                  }/${chat.images[0].image_url?.replace(/\\/g, "/")}`}
                ></Avatar>
                <Box>
                  <Typography fontSize="14px">{chat.name}</Typography>
                  <Typography sx={{ fontSize: "12px", color: "#737373" }}>
                    You send an attachment
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box className={style["right-container"]}>
        {selectedChat &&  currentChatUser &&(
          <MessageBox
            selectedChat={selectedChat}
            currentChatUser={currentChatUser}
          ></MessageBox>
        )}
      </Box>
    </Box>
  );
};

export default Message;
