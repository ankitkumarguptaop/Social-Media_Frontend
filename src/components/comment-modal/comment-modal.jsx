"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PostCarousel from "../post-carousel/post";
import { useDispatch, useSelector } from "react-redux";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import {
  addCommentOnPost,
  listCommentOnPost,
} from "@/features/comment/comment.action";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "./comment-modal.module.css";
import Comment from "../comment/comment";

const CommentModal = ({ open, onClose, post }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [content, setContent] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [thisPostComments, setThidsPostComment] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log("✌️thisPostComments --->", thisPostComments);

  const fetchMoreData = async () => {
    dispatch(listCommentOnPost({ page, limit, postId: post.id })).then(
      (result) => {
        setThidsPostComment([
          ...thisPostComments,
          ...result.payload.comment.rows,
        ]);
        if (result?.payload?.comment?.rows?.length < limit) {
          setHasMore(false);
        }
      }
    );
    setPage((prev) => prev + 1);
  };

  const commentOnPost = async () => {
    dispatch(addCommentOnPost({ postId: post.id, content: content })).then(
      (result) => {
        const data = {
          ...result.payload.comment,
          user: {
            images: [{ image_url: currentUser?.profileImage?.image_url }],
            name: currentUser?.user?.name,
          },
        };
        setThidsPostComment([...thisPostComments, data]);

        if (result?.payload?.comment?.rows?.length < limit) {
          setHasMore(false);
        }
      }
    );
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.05)",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "30px",
          }}
        >
          <CloseIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => onClose(false)}
          ></CloseIcon>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "700px",
              width: "80vw",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ width: "60%", height: "100%" }}>
              <PostCarousel height={700} post={post} />
            </Box>
            <Box sx={{ width: "40%", height: "100%" }}>
           
              <Box className={styled["comment-header"]}></Box>
              <Box >
              <InfiniteScroll
                dataLength={thisPostComments?.length || 0}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <Box
                    sx={{
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
                    sx={{
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
                {thisPostComments?.map((comment) => {
                // const likes = allCommentLikes.filter(
                //   (like) => like?.like?.commentId === comment?.id
                // );
                return <Comment key={comment.id} comment={comment} />;
              })}
              </InfiniteScroll>
              </Box>
              <Box className={styled["comment-footer"]} sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ width: "100%", outline: "none" }}
                  id="standard-basic"
                  placeholder="Add a comment..."
                  variant="standard"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <IconButton aria-label="description for action">
                              <SentimentSatisfiedRoundedIcon
                                sx={{ color: "black" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        </>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={() => commentOnPost()}>Post</Button>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
