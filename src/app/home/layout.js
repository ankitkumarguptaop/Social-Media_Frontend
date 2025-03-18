"use client";
import { Box, Typography } from "@mui/material";
import styles from "./home.module.css";
import Instagram from "../../assets/images/instagram-logo.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import { redirect } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import MovieIcon from "@mui/icons-material/Movie";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/auth.slice";


export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  return (
    <Box className={styles["home"]}>
      <Box className={styles["left-container"]}>
        <Box className={styles["insta-logo"]}>
          <Image height={35} src={Instagram} alt="Instagram" />
        </Box>
        <Box className={styles["upper-section"]}>
          <Box
            className={styles["menu-item"]}
            onClick={() => redirect("/home")}
          >
            <HomeIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Home</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <SearchIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Search</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <ExploreIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Explore</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <MovieIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Reels</Typography>
          </Box>
          <Box
            className={styles["menu-item"]}
            onClick={() => {
              redirect("/home/message");
            }}
          >
            <SendIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Messages</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <FavoriteBorderIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Notifications</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <AddBoxIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Create</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <AccountCircleIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Profile</Typography>
          </Box>
        </Box>

        <Box className={styles["lower-container"]}>
          <Box className={styles["menu-item"]}>
            <SmartToyIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>AI Studio</Typography>
          </Box>
          <Box className={styles["menu-item"]}>
            <ChatBubbleOutlineIcon className={styles["icon"]} />
            <Typography className={styles["text"]}>Threads</Typography>
          </Box>
          <a
            href={"/"}
            style={{
              color: "#000000",
              textTransform: "none",
              textDecoration: "none",
            }}
          >
            <Box
              className={styles["menu-item"]}
              onClick={() => dispatch(logout() )}
            >
              <MenuIcon className={styles["icon"]} />
              <Typography className={styles["text"]}>Log out</Typography>
            </Box>
          </a>
        </Box>
      </Box>

      {children}
    </Box>
  );
}
