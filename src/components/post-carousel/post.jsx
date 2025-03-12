import { Box } from '@mui/material'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PostCarousel = ({post ,height}) => {
  return (
    <Carousel   showArrows={true}>
    {post?.images.map((image) => (
      <Box
        display={"flex"}
        key={image.id}
        component="img"
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL
          }/${image.image_url.replace(/\\/g, "/")}`}
        alt="Post"
        sx={{
          width: "100%",
          height: height,
          objectFit: "contain",
        
        }}
      />
    ))}
  </Carousel>
  )
}

export default PostCarousel
