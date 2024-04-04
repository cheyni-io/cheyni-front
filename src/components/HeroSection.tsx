import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Button, IconButton, Typography, useTheme } from "@mui/material";

import { MEDIA_TYPE } from "src/types/Common";

interface TopTrailerProps {
  mediaType: MEDIA_TYPE;
}

export default function TopTrailer({ mediaType }: TopTrailerProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          mb: 3,
          pb: "40%",
          top: 0,
          left: 0,
          right: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "56.25vw",
            position: "absolute",
          }}
        >
          <>
            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            >
              {/* <img
                    src='./assets/slowfood.png'
                    alt={'Slow Food'}
                    width="100%"
                    height="100%"
                  /> */}
              <video
                src="./assets/CheyniBg.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%" }}
              />
              {/* <Box
                sx={{
                  // background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                  background: isDarkMode
                    ? "linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)"
                    : "linear-gradient(77deg,rgba(255,255,255,.6),transparent 100%)",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: "26.09%",
                  opacity: 1,
                  position: "absolute",
                }}
              /> */}
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                  backgroundImage: `url('./assets/Backgroundline.png')`,
                  backgroundSize: "20%", // Ou experimente outros valores como "50%" ou "auto"
                  opacity: 1,
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                  backgroundColor: "#000", // Black background color
                  opacity: "45%", // Adjust opacity as needed
                }}
              />
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
}
