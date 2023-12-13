import Button, { ButtonProps } from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material";

export default function MoreInfoButton({ sx, ...others }: ButtonProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <Button
      variant="contained"
      startIcon={
        <InfoOutlinedIcon
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
        ...sx,
        px: { xs: 1, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        fontSize: { xs: 16, sm: 20, md: 24 },
        lineHeight: 1.5,
        fontWeight: "bold",
        textTransform: "capitalize",
        color: isDarkMode ? "#0c0b30" : "#fff",
        bgcolor: isDarkMode ? "#FFF" : "#0c0b30",
        whiteSpace: "nowrap",
        "&:hover": { 
          bgcolor: isDarkMode ? "#0c0b30" : "#fff",
          color: isDarkMode ? theme.palette.primary.light : "#0c0b30",
        },
      }}
    >
      More Info
    </Button>
  );
}
