import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import { useTheme } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

export default function PlayButton({ sx, id,  ...others }: ButtonProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <Button
      color="inherit"
      variant="contained"
      startIcon={
        <PlayCircle
          sx={{
            fontSize: {
              xs: "24px !important",
              sm: "32px !important",
              md: "40px !important",
            },
          }}
        />
      }
      {...others}
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        fontSize: { xs: 16, sm: 20, md: 24 },
        lineHeight: 1.5,
        fontWeight: "bold",
        whiteSpace: "nowrap",
        textTransform: "capitalize",
        color: isDarkMode ? "#FFF" : "#0c0b30",
        bgcolor: isDarkMode ? "#0c0b30" : "#fff",
        "&:hover": {
          bgcolor: isDarkMode ? "#fff" : "#0c0b30",
          color: isDarkMode ? "#0c0b30" : "#fff",
        },
        ...sx,
      }}
      onClick={() => navigate(`/${MAIN_PATH.watch}/${id}`)}
    >
      Play
    </Button>
  );
}
