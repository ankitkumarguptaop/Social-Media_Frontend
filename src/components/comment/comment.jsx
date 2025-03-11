import React, { useState } from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./comment.module.css";

const Comment = ({ comment }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles["comment-container"]}>
      <Avatar
        src={comment.userAvatar}
        alt={comment.userName}
        className={styles["user-avatar"]}
      />

      <div className={styles["comment-details"]}>
        <Typography className={styles["user-name"]}>{comment.userName}</Typography>
        <Typography className={styles["comment-text"]}>{comment.text}</Typography>
      </div>

      <IconButton onClick={handleLike} className={styles["like-button"]}>
        {liked ? (
          <FavoriteIcon className={styles["liked-icon"]} />
        ) : (
          <FavoriteBorderIcon className={styles["unliked-icon"]} />
        )}
      </IconButton>
    </div>
  );
};

export default Comment;
