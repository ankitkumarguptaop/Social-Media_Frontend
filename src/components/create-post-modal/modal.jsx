import { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { createPost } from "@/features/post/post.action";

const schema = z.object({
  caption: z.string().min(3, "Caption is required"),
  postImages: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "At least one image is required"),
});

const postModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data.postImages["0"]);

    let formdata = new FormData();
    formdata.append("caption", data.caption);
    Array.from(data.postImages).forEach((file) => {
      formdata.append("postImages", file);
    });

    dispatch(createPost(formdata));
    console.log("✌️formdata --->", formdata);
    onClose();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setValue("postImages", files);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload Images
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="caption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Caption"
                fullWidth
                margin="normal"
                error={!!errors.caption}
                helperText={errors.caption?.message}
              />
            )}
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: "16px" }}
          />
          {errors.images && (
            <Typography color="error" variant="body2">
              {errors.images.message}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mt: 3,
            }}
          >
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default postModal;
