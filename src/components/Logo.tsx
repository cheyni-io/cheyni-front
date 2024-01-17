import { useTheme } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <RouterLink to={`/${MAIN_PATH.browse}`}>
      <Box
        component="img"
        alt="Cheyni Logo"
        src={isDarkMode ? "https://i.imgur.com/i9s0iVT.png" : "https://i.imgur.com/nFNOkfS.png"}
        width={100}
        height={22}
        sx={{
          ...sx,
        }}
      />
    </RouterLink>
  );
}
