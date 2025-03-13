"use client";

import { listPostLike } from "@/features/like/like.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./post.module.css";
import { Carousel } from "react-responsive-carousel";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { addlikeOnPost, removePostLike } from "@/features/like/like.action";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import Comment from "../comment/comment";
import CommentModal from "../comment-modal/comment-modal";
import PostCarousel from "../post-carousel/post";
import { listCommentOnPost } from "@/features/comment/comment.action";

const Post = ({ post, initialLikes }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [profilePicture, setProfilePicture] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser?.profileImage?.image_url}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );
  const [likes, setLikes] = useState(initialLikes || []);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

  const handleLike = async () => {
    const isLiked = likes?.rows?.some(
      (user) => user.user_id === currentUser?.user?.id
    );

    if (isLiked) {
      setLikes((prevLikes) => ({
        count: prevLikes.count - 1,
        rows: prevLikes.rows.filter(
          (user) => user.user_id !== currentUser?.user?.id
        ),
      }));
      dispatch(removePostLike({ postId: post.id }));
    } else {
      setLikes((prevLikes) => ({
        count: prevLikes.count + 1,
        rows: [...prevLikes.rows, { user_id: currentUser?.user?.id }],
      }));
      dispatch(addlikeOnPost({ postId: post.id }));
    }
  };


  useEffect(() => {
    setLikes(initialLikes);
    dispatch(listPostLike({ postId: post.id }));
  }, [initialLikes]);

  return (
    <>
      <Box key={post.id} className={styles["post"]}>
        <Box className={styles["post-description"]}>
          <Avatar
            alt="User"
            src={`${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/${post?.user?.images[0]?.image_url?.replace(
              /\\/g,
              "/"
            )}`}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          <Typography fontWeight="bold">{post?.user?.name}</Typography>
        </Box>
        <PostCarousel post={post} height={400}></PostCarousel>
        <Box className={styles["post-interaction"]}>
          <Box
            sx={{
              display: "flex",
              width: "15%",
              justifyContent: "space-between",
              padding: "10px 0px",
            }}
          >
            {likes?.rows?.some(
              (user) => user.user_id === currentUser?.user?.id
            ) ? (
              <FavoriteIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{ cursor: "pointer", color: "black" }}
                onClick={handleLike}
              />
            )}
            <Typography>{likes?.count}</Typography>
            <MapsUgcOutlinedIcon
              cursor="pointer"
              onClick={() => setIsOpenCommentModal(!isOpenCommentModal)}
            ></MapsUgcOutlinedIcon>
          </Box>
          <SendOutlinedIcon cursor="pointer"></SendOutlinedIcon>
        </Box>

        <Box sx={{ padding: "0 16px" }}>
          <Typography fontWeight="bold">{post?.user?.name}</Typography>
          <Typography>{post?.caption}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>
        <TextField
          sx={{ width: "100%", marginBottom: "20px" }}
          id="standard-basic"
          label="Add a Comment..."
          variant="standard"
        />
      </Box>
      <CommentModal
        post={post}
        open={isOpenCommentModal}
        onClose={setIsOpenCommentModal}
      >
        {" "}
      </CommentModal>
    </>
  );
};

export default Post;
