"use client";
import React, { useEffect } from "react";
import style from "./home.module.css";
import { Avatar, Box } from "@mui/material";
import camera from "../../assets/images/Camera Icon.png";
import tv from "../../assets/images/IGTV.png";
import messanger from "../../assets/images/Messanger.png";
import instagram from "../../assets/images/instagram-logo.png";
import Image from "next/image";

const Home = () => {
  return (
    <Box className={style["home-container"]}>
      <Box className={style["header"]}>
        <Box
          sx={{
            position: "relative",
            width: `${40}px`,
            height: `${40}px`,
            paddingRight: 3,
          }}
        >
          <Image
            src={camera}
            alt="camera"
            fill
            style={{ objectFit: "contain" }}
          ></Image>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: `${140}px`,
            height: `${50}px`,
            paddingRight: 8,
          }}
        >
          <Image
            src={instagram}
            alt="camera"
            fill
            style={{ objectFit: "contain" }}
          ></Image>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: `${40}px`,
            height: `${40}px`,
            paddingRight: 3,
          }}
        >
          <Image
            src={tv}
            alt="tv"
            fill
            style={{ objectFit: "contain" }}
          ></Image>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: `${40}px`,
            height: `${40}px`,
            paddingRight: 3,
          }}
        >
          <Image
            src={messanger}
            alt="messanger"
            fill
            style={{ objectFit: "contain" }}
          ></Image>
        </Box>
      </Box>
      <Box className={style["avatars"]}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 70, height: 70, margin: "0px 10px" }}
        />
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 70, height: 70, margin: "0px 10px" }}
        />
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 70, height: 70, margin: "0px 10px" }}
        />
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 70, height: 70, margin: "0px 10px" }}
        />
      </Box>
      <Box className={style["posts"]}>
        <Box className={style["post-description"]}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 70, height: 70, margin: "0px 10px" }}
          />
        </Box>

        <Box className={style["post-interaction"]}></Box>
      </Box>
      <Box className={style["footer"]}></Box>
    </Box>
  );
};

export default Home;
