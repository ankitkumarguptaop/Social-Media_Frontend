"use client";
import React from "react";
import Input from "../../../components/input/input";
import { Box, Button, Typography } from "@mui/material";
import style from "./signup.module.css";
import { useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { signInUser, signUpUser } from "@/features/auth/auth.action";
import { redirect } from "next/navigation";
import facebook from "../../../assets/images/Icon.png";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";

const SignUp = () => {
  const formSchema = z.object({
    password: z
      .string()
      .min(1, "Enter valid Password")
      .regex(
        new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/),
        "Enter valid Password"
      ),
    email: z.string().email("Enter valid Email").min(1),
    name: z
      .string()
      .transform((value) => value.replace(/\s+/g, ""))
      .pipe(z.string().min(3, "Enter valid Name")),
    profilePic: z.any(),
  });
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      profilePic: "",
    },
  });

  const onSubmit = async (data) => {
    let formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("password", data.password);
    formdata.append("email", data.email);
    formdata.append("profilePic", data.profilePic);

    const res = await dispatch(signUpUser(formdata));
console.log('✌️res --->', res);
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Sucessfuly Signed in", {
        variant: "success",
        autoHideDuration: 5000,
      });
      redirect("/");
    }
    reset();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profilePic", file);
    }
  };

  return (
    <FormControl className={style["form"]}>
      <Box sx={{ width: "90%" }}>
        <Input
          width="100%"
          lable={"Name"}
          register={register}
          feildName="name"
          margin={"10px 0px"}
          errors={errors}
        ></Input>
        <Input
          width="100%"
          lable={"Email"}
          register={register}
          feildName="email"
          margin={"10px 0px"}
          errors={errors}
        ></Input>

        <Input
          width="100%"
          lable={"Password"}
          margin={"10px 0px"}
          register={register}
          feildName="password"
          errors={errors}
        ></Input>
      </Box>
      <Box variant="contained" component="label">
        <input type="file" onChange={handleImageUpload} />
      </Box>

      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#3797EF",
          width: "90%",
          height: "50px",
          borderRadius: "10px",
          textTransform: "none",
          marginTop: "20px",
        }}
      >
        Sign Up
      </Button>

      <Box
        sx={{
          margin: "15px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: `${17}px`,
            height: `${17}px`,
            paddingRight: 3,
          }}
        >
          <Image
            src={facebook}
            alt="facebok"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
        Log in with Facebook{" "}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Box
          sx={{
            color: "#808080",
            borderTop: "1px solid #808080",
            width: "40%",
          }}
        ></Box>

        <Box
          sx={{
            color: "#808080",
            fontSize: "13px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          OR
        </Box>

        <Box
          sx={{
            color: "#808080",
            borderTop: "1px solid #808080",
            width: "40%",
          }}
        ></Box>
      </Box>

      <Box display={"flex"} color={"#808080"}>
        Already have an account?{" "}
        <Link
          href={"./"}
          style={{
            color: "#3797EF",
            textTransform: "none",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Sign In.
        </Link>
      </Box>
      <Box marginTop={13} color={"#808080"}>
        Instagram от Facebook
      </Box>
    </FormControl>
  );
};

export default SignUp;
