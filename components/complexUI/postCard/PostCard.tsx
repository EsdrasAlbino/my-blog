import {
  Button,
  Card,
  CardContent,
  CardMedia,
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
  backgroundColor: (theme.vars || theme).palette.background.paper,
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

export const PostCard = ({ card, index }: { card: Post; index: number }) => {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const router = useRouter();

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
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
            <Button>
              <DeleteOutlineIcon />
            </Button>
            <Button onClick={() => {
              router.push(`/blog/${card.id}/edit`);
            }}>
              <EditIcon/>
            </Button>
          </StyledContainerIcon>
        </SyledCardContent>
        {card.authors && <Author authors={card.authors} />}
      </SyledCard>
    </Grid>
  );
};
