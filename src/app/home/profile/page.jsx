"use client";
import { listUserPost } from "@/features/post/post.action";
import { removePosts } from "@/features/post/post.slice";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InstagramMinimalProfile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userPosts = useSelector((state) => state.post.userPosts);

  console.log("✌️userPosts --->", userPosts);

  const [profilePicture] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${currentUser?.profileImage?.image_url}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );

  useEffect(() => {
    dispatch(listUserPost({ limit: 10, page: 1 }));
     dispatch(removePosts());
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 900,
        minWidth:500,
        mx: "auto",
        py: 4,
        px: 2,
        border: "1px solid #e6e6e6",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        top: 100,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        mb={4}
        width={"25%"}
      >
        <Avatar src={profilePicture} sx={{ width: 100, height: 100, mb: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          {currentUser.user.name || "Username"}
        </Typography>
      </Box>

      <Box
        height={550}

        overflow="auto"
        sx={{ border: "1px solid #e6e6e6", borderRadius: 2, p: 1 }}
      >
        <Grid container spacing={1}>
          { userPosts.length>0 ? userPosts.map((img) => (
            <Grid key={`user-image${img.id}`} item xs={4}>
              <Box
                component="img"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img.images[0].image_url}`
                  .replace(/ /g, "%20")
                  .replace(/\\/g, "/")}
                alt={`Post ${img.id}`}
                sx={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                }}
              />
            </Grid>
          )) : <Typography variant="body2" color="textSecondary" sx={{ width: "100%", textAlign: "center" }}>
            No posts available.
          </Typography>}
        </Grid>
      </Box>
    </Box>
  );
}
