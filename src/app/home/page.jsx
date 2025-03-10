
"use client";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Avatar, Box, IconButton, Typography, Fab } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TvIcon from "@mui/icons-material/Tv";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { listPost } from "@/features/post/post.action";
import CreatePostModal from "@/components/create-post-modal/modal";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
console.log('✌️posts --->', posts);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(listPost());
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
              src={`/static/images/avatar/${(index % 5) + 1}.jpg`}
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
  {posts.map((post) => (
    <Box key={post.id}>
      {/* Post Header */}
      <Box className={styles["post-description"]}>
        <Avatar
          alt="User"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 40, height: 40, marginRight: 1 }}
        />
        <Typography fontWeight="bold">username_{post.user_id}</Typography>
      </Box>

      {/* Post Images */}
      {post.images.map((image) => (
        <Box
          key={image.id}
          component="img"
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.image_url.replace(/\\/g, "/")}`}
          alt="Post"
          sx={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            marginTop: 1,
          }}
        />
      ))}

      {/* Post Interaction */}
      <Box className={styles["post-interaction"]}>
        <Box>
          <IconButton>
            <i className="fas fa-heart"></i>
          </IconButton>
          <IconButton>
            <i className="fas fa-comment"></i>
          </IconButton>
          <IconButton>
            <SendIcon />
          </IconButton>
        </Box>
        <IconButton>
          <i className="far fa-bookmark"></i>
        </IconButton>
      </Box>

      {/* Post Caption */}
      <Box sx={{ padding: "0 16px" }}>
        <Typography variant="body2">
          <strong>username_{post.user_id}</strong> {post.caption}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(post.createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  ))}
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
            src="/static/images/avatar/1.jpg"
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
