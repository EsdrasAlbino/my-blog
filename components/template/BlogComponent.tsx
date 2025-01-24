"use client";
import { dataMock } from "@/lib/data";
import { Post } from "@/lib/types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { PostCard } from "../complexUI/postCard/PostCard";

export default function MainContent() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  const getPosts = async () => {
    const response = await fetch("/api/posts");
    const posts = await response.json();
    setPosts(posts);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Blog
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        {/* <Search /> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          {dataMock.categories.map((category) => (
            <Chip
              key={category.label}
              onClick={handleClick}
              size={category.size as "small" | "medium"}
              label={category.label}
              sx={category?.sx}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          {/* <Search /> */}
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {posts.map((card, index) => (
          <PostCard card={card} index={index} key={card.title} />
        ))}
      </Grid>
    </Box>
  );
}
