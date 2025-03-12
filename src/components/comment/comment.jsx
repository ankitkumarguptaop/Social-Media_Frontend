import React, { useState } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./comment.module.css";

const Comment = ({ comment }) => {
  console.log("✌️comment --->", comment);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Box className={styles["comment-container"]}>
      <Avatar
        src={`${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/${comment?.user?.images[0]?.image_url?.replace(/\\/g, "/")}`}
        alt={comment?.user?.name}
        className={styles["user-avatar"]}
      />

      <Box className={styles["comment-details"]}>
        <Typography className={styles["user-name"]}>
          {comment?.user?.name}
        </Typography>
        <Typography className={styles["comment-text"]}>
          {comment?.content}
        </Typography>
      </Box>

      <IconButton onClick={handleLike} className={styles["like-button"]}>
        {liked ? (
          <FavoriteIcon className={styles["liked-icon"]} />
        ) : (
          <FavoriteBorderIcon className={styles["unliked-icon"]} />
        )}
      </IconButton>
    </Box>
  );
};

export default Comment;
