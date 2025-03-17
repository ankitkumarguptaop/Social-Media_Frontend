"use client";
import React, { useEffect, useState } from "react";
import style from "./message.module.css";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createChat, listChat } from "@/features/chat/chat.action";
import ChatCard from "@/components/chat-card/chat";
import MessageBox from "@/components/message-box/message";
const Message = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const currentUser = useSelector((state) => state.auth.currentUser);


  const [currentChatUser ,setCurrentChatUser ] =useState(null)
  console.log("✌️currentUser --->", currentUser);
  console.log("✌️selectedChat --->", selectedChat);
  console.log("✌️chats --->", chats);

  useEffect(() => {
    dispatch(listChat());
  }, []);
  return (
    <Box className={style["message-container"]}>
      <Box className={style["left-container"]}>
        <Typography>Message</Typography>
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <Box
                key={chat.id}
                onClick={() => {
                  setCurrentChatUser(chat)
                  dispatch(
                    createChat({
                      member1: chat.id,
                      member2: currentUser.user.id,
                    })
                  );
                }}
              >
                <ChatCard
                  name={chat.name}
                  avatar={chat.images[0].image_url}
                ></ChatCard>
              </Box>
            );
          })}
      </Box>
      <Box className={style["right-container"]}>
        {selectedChat && <MessageBox selectedChat={selectedChat}  currentChatUser={currentChatUser}></MessageBox>}
      </Box>
    </Box>
  );
};

export default Message;
