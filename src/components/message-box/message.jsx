"use client";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./message.module.css";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import { createMessage, listMessage } from "@/features/message/message.action";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/configs/socket";

const MessageBox = ({ selectedChat, currentChatUser }) => {
  console.log("✌️currentChatUser --->", currentChatUser);
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log("✌️selectedChat --->", selectedChat);

  const messages = useSelector((state) => state.message.messages);

  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(listMessage({ chatId: selectedChat.id }));
    
  }, []);

  return (
    <Box className={style["message-container"]}>
      <Box className={style["message-header"]}>
        <Avatar
          alt="Remy Sharp"
          src={`${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/${currentChatUser.images[0].image_url?.replace(/\\/g, "/")}`}
        />
        <Typography sx={{ padding: "0px 10px" }}>{currentChatUser.name}</Typography>
      </Box>
      <Box className={style["message-content"]}>
        {messages.map((message) => {
          return (
            <Box className={style["single-message"]} key={message.id}>
              <Typography
                className={
                  message.sender_id === currentUser.user.id
                    ? style["sender-message"]
                    : style["reciever-message"]
                }
                sx={{
                  display: "inline",
                  padding: "8px 15px",
                  borderRadius: "50px",
                }}
              >
                {message.message}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box className={style["input-box"]}>
        <TextField
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            width: "100%",
            outline: "none",
            height: "60px",
            input: {
              height: "40px",
            },
          }}
          id="standard-basic"
          placeholder="Message..."
          variant="standard"
          slotProps={{
            input: {
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <IconButton aria-label="description for action">
                      <SentimentSatisfiedRoundedIcon sx={{ color: "black" }} />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={content === ""}
                    onClick={() => {
                      dispatch(
                        createMessage({
                          chatId: selectedChat.id,
                          message: content,
                        })
                      );
                      setContent("");
                    }}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MessageBox;
