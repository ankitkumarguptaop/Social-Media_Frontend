"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./comment.module.css";
import {
  addLikeOnComment,
  listCommentLike,
  removeCommentLike,
} from "@/features/like/like.action";
import { useDispatch, useSelector } from "react-redux";
import { setReplyState, setReplyTo } from "@/features/comment/comment.slice";
import { listCommentOnComment } from "@/features/comment/comment.action";
import InfiniteScroll from "react-infinite-scroll-component";
import ChildComment from "../child-comment/comment";

const Comment = ({ comment, inputRef }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const [totalLiked, setTotalLiked] = useState([]);
  const [thisCommentComment, setThisCommentComment] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isViewReply, setIsViewReply] = useState(false);

  const handleLike = async () => {
    const isLiked = totalLiked?.rows?.some(
      (user) => user.user_id === currentUser?.user?.id
    );
    if (isLiked) {
      setTotalLiked((prevLikes) => ({
        count: prevLikes?.count - 1,
        rows: prevLikes?.rows.filter(
          (user) => user.user_id !== currentUser?.user?.id
        ),
      }));
      dispatch(removeCommentLike({ commentId: comment.id }));
    } else {
      setTotalLiked((prevLikes) => ({
        count: prevLikes?.count + 1,
        rows: [...prevLikes?.rows, { user_id: currentUser?.user?.id }],
      }));
      dispatch(addLikeOnComment({ commentId: comment.id }));
    }
  };
  function shiftFocus() {
    inputRef.current.focus();
    dispatch(setReplyState(true));
  }

  // useEffect(() => {
  //   fetchMoreData();
  // }, []);

  const fetchMoreData = async () => {
    dispatch(listCommentOnComment({ page, limit, commentId: comment.id })).then(
      (result) => {
        setThisCommentComment([
          ...thisCommentComment,
          ...result?.payload?.comment?.rows,
        ]);
        if (result?.payload?.comment?.rows?.length < limit) {
          setHasMore(false);
        }
      }
    );
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(listCommentLike({ commentId: comment.id })).then((result) => {
      setTotalLiked(result?.payload?.like);
    });
    fetchMoreData();
  }, []);

  return (
    <>
      <Box className={styles["comment-container"]}>
        <Avatar
          src={`${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/${comment?.user?.images[0]?.image_url?.replace(/\\/g, "/")}`}
          alt={comment?.user?.name}
          className={styles["user-avatar"]}
        />

        <Box className={styles["comment-details"]}>
          <Typography sx={{ fontSize: "12px" }} className={styles["user-name"]}>
            {comment?.user?.name}
          </Typography>
          <Typography
            sx={{ fontSize: "12px" }}
            className={styles["comment-text"]}
          >
            {comment?.content}
          </Typography>
        </Box>

        <IconButton onClick={handleLike} className={styles["like-button"]}>
          {totalLiked?.rows?.some(
            (user) => user.user_id === currentUser?.user?.id
          ) ? (
            <FavoriteIcon className={styles["liked-icon"]} />
          ) : (
            <FavoriteBorderIcon className={styles["unliked-icon"]} />
          )}
        </IconButton>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontSize: "12px", padding: "3px 10px", color: "grey" }}
        >
          {totalLiked?.count || 0} likes{" "}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "grey",
            padding: "3px 10px",
            cursor: "pointer",
          }}
          onClick={() => {
            shiftFocus();
            dispatch(setReplyTo(comment.id));
          }}
        >
          Reply
        </Typography>{" "}
        {thisCommentComment.length > 0 && (
          <Typography
            sx={{
              fontSize: "12px",
              color: "grey",
              padding: "3px 10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsViewReply(!isViewReply);
            }}
          >
            {isViewReply ? "Close" : " View replies"}
          </Typography>
        )}
      </Box>
      {isViewReply && thisCommentComment.length > 0 && (
        <InfiniteScroll
          height={200}
          scrollableTarget="infinite-div"
          className={styles["infinite-scroll"]}
          dataLength={thisCommentComment?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "16px",
                fontSize: "11px",
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
                fontSize: "11px",
              }}
            >
              No more comment to show
            </Box>
          }
        >
          {thisCommentComment?.map((comment) => {
            return (
              <ChildComment
                key={comment.id}
                inputRef={inputRef}
                comment={comment}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Comment;
