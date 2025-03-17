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
import Post from "@/components/post-card/post";
import InfiniteScroll from "react-infinite-scroll-component";
import Instagram from "../../assets/images/instagram-logo.png";
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import { redirect } from "next/navigation";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allPostLikes = useSelector((state) => state.like.postLikes);

  const [profilePicture, setProfilePicture] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser?.profileImage?.image_url}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    dispatch(listPost({ page, limit })).then((result) => {
      if (result?.payload?.post?.rows?.length < limit) {
        setHasMore(false);
      }
    });

    setPage((prev) => prev + 1);
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  return (
    <Box className={styles["home"]}>
      <Box className={styles["left-container"]}>
        <Box className={styles["insta-logo"]}>
          <Image height={35} src={Instagram} alt="instagram text"></Image>
        </Box>
        <Box className={styles["upper-section"]}>
          <Box className={styles["home-logo"]}>
            <HomeIcon></HomeIcon>
            <Typography>Home</Typography>
          </Box>
          <Box className={styles["search"]}>
            <Typography>Search</Typography>
          </Box>
          <Box className={styles["explore"]}>
            <Typography>Explore</Typography>
          </Box>
          <Box className={styles["reels"]}>
            <Typography>Reels</Typography>
          </Box>
          <Box className={styles["messages"]} >
            <Typography onClick={()=>redirect("home/message")}>Messages</Typography>
          </Box>
          <Box className={styles["notifications"]}>
            <Typography>Notifications</Typography>
          </Box>
          <Box className={styles["create"]}>
            <Typography>Create</Typography>
          </Box>
          <Box className={styles["profile"]}>
            <Typography>Profile</Typography>
          </Box>
        </Box>

        <Box className={styles['lower-container']}>
        <Box className={styles["ai-studio"]}>
          <Typography>Ai-Studio</Typography>
        </Box>
        <Box className={styles["threads"]}>
        <Typography>Threads</Typography>
        </Box>
        <Box className={styles["More"]}>
        <Typography>More</Typography>
        </Box>
        </Box>
      </Box>

      <Box className={styles["home-container"]}>
        <Box className={styles["header"]}>
          <IconButton>
            <CameraAltIcon />
          </IconButton>
          <Image height={50} src={Instagram} alt="instagram text"></Image>
          <Box>
            <IconButton>
              <TvIcon />
            </IconButton>
            <IconButton>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>

        <InfiniteScroll
          dataLength={posts?.rows?.length || 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              Loading more posts...
            </Box>
          }
          endMessage={
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              No more posts to show
            </Box>
          }
        >
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
              return (
                <Post key={post.id} post={post} initialLikes={likes[0]?.like} />
              );
            })}
          </Box>
        </InfiniteScroll>

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
      <Box className={styles["right-continer"]}></Box>
    </Box>
  );
};

export default Home;
