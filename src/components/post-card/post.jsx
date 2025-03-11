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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { addlikeOnPost, removePostLike } from "@/features/like/like.action";
import { Avatar, Box, Typography } from '@mui/material'


const Post = ({post ,likes}) => {
console.log('✌️likeshfhgh --->', likes);
const dispatch =useDispatch()
const currentUser = useSelector((state) => state.auth.currentUser);

const [profilePicture, setProfilePicture] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser?.profileImage?.image_url}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );
useEffect(()=>{
    dispatch(listPostLike({postId: post.id}))
},[])


  return (
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
      {post.images.map((image) => (
        <Box
          display={"flex"}
          key={image.id}
          component="img"
          src={`${
            process.env.NEXT_PUBLIC_BACKEND_URL
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
        {!post.likes.find((user) => user.user_id === currentUser.user.id) ? (
          <FavoriteBorderOutlinedIcon
            sx={{ cursor: "pointer", color: "black" }}
            onClick={() => {
              dispatch(addlikeOnPost({ postId: post.id }));
            }}
          ></FavoriteBorderOutlinedIcon>
        ) : (
          <FavoriteIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              dispatch(removePostLike({ postId: post.id }));
            }}
          ></FavoriteIcon>
        )}
        <Typography> {likes[0].like.count} </Typography>
        <MapsUgcOutlinedIcon cursor="pointer"></MapsUgcOutlinedIcon>
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
  </Box>
    
  )
}

export default Post
