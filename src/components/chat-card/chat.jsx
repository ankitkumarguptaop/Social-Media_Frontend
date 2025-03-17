import * as React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";

export default function ChatCard({ name ="djgsugbiuk" ,avatar}) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        cursor:"pointer",
        display: "flex",
        alignItems: "center",
        width: 350,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <Avatar alt="Remy Sharp" src={`${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/${avatar.replace(/\\/g, "/")}`} />

      <CardContent>
        <Typography level="title-lg" id="card-description">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
