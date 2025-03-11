"use client";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Fab,
  ButtonGroup,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TvIcon from "@mui/icons-material/Tv";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { listPost } from "@/features/post/post.action";
import CreatePostModal from "@/components/create-post-modal/modal";

import Post from "@/components/post-card/post";
const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  console.log("✌️posts --->", posts.rows);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allPostLikes = useSelector((state) => state.like.postLikes);
  console.log("✌️allPostLikes --->", allPostLikes);
  console.log("✌️currentUser --->", currentUser);

  const [profilePicture, setProfilePicture] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser?.profileImage?.image_url}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );

  console.log("✌️posts --->", profilePicture);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(listPost({ page: 1, limit: 155 }));
  }, []);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  return (
    <Box className={styles["home-container"]}>
      <Box className={styles["header"]}>
        <IconButton>
          <CameraAltIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ fontFamily: "Arial, sans-serif" }}
        >
          Instagram
        </Typography>
        <Box>
          <IconButton>
            <TvIcon />
          </IconButton>
          <IconButton>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      <Box className={styles["avatars"]}>
        {[...Array(10)].map((_, index) => (
          <Box key={index} className={styles["avatar-item"]}>
            <Avatar
              alt={`Story ${index + 1}`}
              src={`/static/.jpg`}
              sx={{
                width: 64,
                height: 64,
                border: "2px solid #e1306c",
                cursor: "pointer",
              }}
            />
          </Box>
        ))}
      </Box>

      <Box className={styles["posts"]}>
        {posts?.rows?.map((post) => {
          const likes = allPostLikes.filter(
            (like) => like?.like?.postId === post?.id
          );
          console.log("✌️likes ddd--->", likes);
          return <Post key={post.id} post={post} likes={likes}></Post>;
        })}
      </Box>

      <Box className={styles["footer"]}>
        <IconButton>
          <i className="fas fa-home"></i>
        </IconButton>
        <IconButton>
          <i className="fas fa-search"></i>
        </IconButton>
        <Fab
          color="primary"
          size="medium"
          sx={{
            backgroundColor: "#e1306c",
            "&:hover": { backgroundColor: "#c21e5c" },
          }}
          onClick={handleOpenCreateModal}
        >
          <AddCircleIcon />
        </Fab>
        <IconButton>
          <i className="far fa-heart"></i>
        </IconButton>
        <IconButton>
          <Avatar
            alt="Profile"
            src={profilePicture}
            sx={{ width: 28, height: 28 }}
          />
        </IconButton>
      </Box>

      <CreatePostModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
      />
    </Box>
  );
};

export default Home;
