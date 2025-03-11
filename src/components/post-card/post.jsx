'use client'

import { listPostLike } from '@/features/like/like.action'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './post.module.css'
import { Carousel } from "react-responsive-carousel";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addlikeOnPost, removePostLike } from "@/features/like/like.action";
import { Avatar, Box, TextField, Typography } from '@mui/material'
import Comment from '../comment/comment'


const Post = ({ post, initialLikes }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [profilePicture, setProfilePicture] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser?.profileImage?.image_url}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );
  const [likes, setLikes] = useState(initialLikes || [])
  const [isOpenComment, setIsOpenComment] = useState(false)


  const handleLike = async () => {
    const isLiked = likes?.rows?.some(user => user.user_id === currentUser?.user?.id);

    if (isLiked) {
      setLikes(prevLikes => ({
        count: prevLikes.count - 1,
        rows: prevLikes.rows.filter(user => user.user_id !== currentUser?.user?.id)
      }));
      dispatch(removePostLike({ postId: post.id }));
    } else {
      setLikes(prevLikes => ({
        count: prevLikes.count + 1,
        rows: [...prevLikes.rows, { user_id: currentUser?.user?.id }]
      }));
      dispatch(addlikeOnPost({ postId: post.id }));
    }
  };
  const comments = [
    {
      id: 1,
      userName: "john_doe",
      userAvatar: "/path-to-avatar.jpg",
      text: "This is an awesome post!",
    },
    {
      id: 2,
      userName: "jane_doe",
      userAvatar: "/path-to-avatar2.jpg",
      text: "Great work! 👏",
    },
  ];

  useEffect(() => {
    setLikes(initialLikes)
    dispatch(listPostLike({ postId: post.id }))
  }, [initialLikes])


  return (
    <>
      <Box key={post.id} className={styles["post"]}>
        <Box className={styles["post-description"]}>
          <Avatar
            alt="User"
            src={profilePicture}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          <Typography fontWeight="bold">{post?.user?.name}</Typography>
        </Box>
        <Carousel showArrows={true}>
          {post?.images.map((image) => (
            <Box
              display={"flex"}
              key={image.id}
              component="img"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL
                }/${image.image_url.replace(/\\/g, "/")}`}
              alt="Post"
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                marginTop: 1,
              }}
            />
          ))}
        </Carousel>
        <Box className={styles["post-interaction"]}>
          <Box
            sx={{
              display: "flex",
              width: "15%",
              justifyContent: "space-between",
              padding: "10px 0px",
            }}
          >
            {likes?.rows?.some(user => user.user_id === currentUser?.user?.id) ? (
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
            <MapsUgcOutlinedIcon cursor="pointer" onClick={() => setIsOpenComment(!isOpenComment)}></MapsUgcOutlinedIcon>
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
        <TextField sx={{ width: '100%', marginBottom: "20px" }} id="standard-basic" label="Add a Comment..." variant="standard" />
        {isOpenComment && <Box>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Box>}

      </Box>
    </>
  )
}

export default Post
