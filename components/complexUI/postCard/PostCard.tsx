import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Author } from "../author/Author";
import { useState } from "react";
import { Post } from "@/lib/types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

const StyledContainerIcon = styled("div")({
  gap: 8,
  position: "relative",
  zIndex: 1,
  left: 30,
  bottom: 0,
});
const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "row",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  gap: 5,
  alignItems: "",
};

export const PostCard = ({ card, index }: { card: Post; index: number }) => {
  
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${card.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: card.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title" style={{ color: "darkgray" }}>
            Tem certeza que quer excluir seu post?
          </h2>
          <p
            id="parent-modal-description"
            color="text.secondary"
            style={{ color: "darkgray" }}
          >
            Clicando no botão Delete você irá excluir o post permanentemente.
          </p>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </Box>
      </Modal>
      <Grid size={{ xs: 12, md: index < 2 ? 6 : 4 }} key={card.title}>
        <SyledCard
          variant="outlined"
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          tabIndex={0}
          className={focusedCardIndex === index ? "Mui-focused" : ""}
        >
          {card?.image && (
            <CardMedia
              component="img"
              alt={card.title}
              image={card.image}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
          )}

          <SyledCardContent>
            <div>
              <Typography gutterBottom variant="h6" component="div">
                {card.title}
              </Typography>

              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {card.content}
              </StyledTypography>
            </div>

            <StyledContainerIcon>
              <Button onClick={handleOpen}>
                <DeleteOutlineIcon />
              </Button>
              <Button
                onClick={() => {
                  router.push(`/blog/${card.id}/edit`);
                }}
              >
                <EditIcon />
              </Button>
            </StyledContainerIcon>
          </SyledCardContent>
          {card.author && (
            <Author authors={[{ avatar: card.image, name: card.author }]} />
          )}
        </SyledCard>
      </Grid>
    </>
  );
};
