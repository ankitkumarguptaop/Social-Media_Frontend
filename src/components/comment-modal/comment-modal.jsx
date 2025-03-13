"use client";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PostCarousel from "../post-carousel/post";
import { useDispatch, useSelector } from "react-redux";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import {
  addCommentOnComment,
  addCommentOnPost,
  listCommentOnPost,
} from "@/features/comment/comment.action";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "./comment-modal.module.css";
import Comment from "../comment/comment";
import { setReplyState } from "@/features/comment/comment.slice";

const CommentModal = ({ open, onClose, post }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [content, setContent] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [thisPostComments, setThisPostComment] = useState([]);


  const currentUser = useSelector((state) => state.auth.currentUser);
  const replyState = useSelector((state) => state.comment.replyState);
  const replyTo = useSelector((state) => state.comment.replyTo);

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
        setThisPostComment([...thisPostComments, data]);

        if (result?.payload?.comment?.rows?.length < limit) {
          setHasMore(false);
        }
      }
    );
  };


  const commentOnComment = async () => {
    dispatch(addCommentOnComment({ commentId: replyTo, content: content })).then(
      (result) => {
        const data = {
          ...result.payload.comment,
          user: {
            images: [{ image_url: currentUser?.profileImage?.image_url }],
            name: currentUser?.user?.name,
          },
        };
        // setThisCommentComment([...thisCommentComment, data]);

        if (result?.payload?.comment?.rows?.length < limit) {
          setHasMore(false);
        }
      }
    );
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    dispatch(listCommentOnPost({ page, limit, postId: post.id })).then(
      (result) => {
        setThisPostComment([
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
              margin: "0px 120px",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ width: "60%", height: "700px" }}>
              <PostCarousel height={700} post={post} />
            </Box>
            <Box sx={{ width: "40%", height: "700px" }} id="infinite-div">
              <Box className={styled["comment-header"]}>
                <Avatar
                  src={`${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                  }/${post?.user?.images[0]?.image_url?.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={post?.user?.name}
                  className={styled["user-avatar"]}
                />

                <Typography sx={{ paddingLeft:"10px", fontSize:"13px"}} className={styled["user-name"]}>
                  {post?.user?.name}
                </Typography>
              </Box>

              <InfiniteScroll
                height={580}
                scrollableTarget="infinite-div"
                className={styled["infinite-scroll"]}
                dataLength={thisPostComments?.length}
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
                    Loading more comments...
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
                    No more comment to show
                  </Box>
                }
              >
                {thisPostComments?.map((comment) => {
                  return (
                    <Box key={comment.id} className={styled["comment"]}>
                      <Comment inputRef={inputRef} comment={comment} />
                    </Box>
                  );
                })}
              </InfiniteScroll>
              <Box className={styled["comment-footer"]}>
                <TextField
                  fullWidth
                
                  inputRef={inputRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{
                    width: "100%",
                    outline: "none",
                    height: "60px",
                    input: {
                      height: "40px",
                    },
                  }}
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
                          {!replyState ? (
                            <Button
                            disabled={content===""}
                              onClick={() => {
                              
                                commentOnPost();
                                setContent("");
                              }}
                            >
                              Post
                            </Button>
                          ) : (
                            <Button
                            disabled={content===""}
                              onClick={() => {
                                commentOnComment();
                                setContent("");
                                dispatch(setReplyState(false));
                              }}
                            >
                              Reply
                            </Button>
                          )}
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
