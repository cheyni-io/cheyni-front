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
        src={isDarkMode ? "https://i.imgur.com/i9s0iVT.png" : "https://i.imgur.com/wAaXykH.png"}
        // width={120}
        // height={26}
        //COmo não perder a qualidade da imagem, foi retirado o width e height
        height="auto"
        sx={{
          ...sx,
          mt: 1,
          width: { xs: 120, sm: 150 },
        }}
      />
    </RouterLink>
  );
}
