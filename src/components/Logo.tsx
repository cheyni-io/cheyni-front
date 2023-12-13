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
        src={isDarkMode ? "./assets/logo-light.png" : "./assets/logo-dark.png"}
        width={90}
        height={22}
        sx={{
          ...sx,
        }}
      />
    </RouterLink>
  );
}
