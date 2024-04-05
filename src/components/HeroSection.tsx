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
          mb: 1,
          pb: { xs: "130%", sm: 0, md: "40%" },
          top: 0,
          left: 0,
          right: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
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
              <video
                src="./assets/CheyniBg.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
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
