import { useState } from "react";
import { usePortal } from "src/providers/PortalProvider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Movie } from "src/types/Movie";
import { Box, Container, Stack, useTheme } from "@mui/material";
import QualityChip from "./QualityChip";
import PlayButton from "./PlayButton";

interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoItemWithHover({ video }: VideoItemWithHoverProps) {
  const setPortal = usePortal();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // Aspect ratio 16:9
      }}
    >
      {isHovered && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "72%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "none",
              borderRadius: "50%",
              width: "auto",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <PlayButton
              sx={{
                color: isDarkMode ? "#fff" : "#0c0b30",
                borderRadius: 4,
                p: { xs: 1, sm: 2 },
              }}
              id={video?.id}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: isDarkMode ? "#0C0B30" : "#fff",
              borderRadius: "0 0 10px 10px",
              padding: "5px 10px",
              opacity: "0.9",
              overflow: "hidden",
              display: { xs: "none", sm: "block"}
            }}
          >
            <Stack direction="row" spacing={1} p={1}>
              <QualityChip label="HD" />
              <QualityChip label="4K" />
              <QualityChip label={video?.genre} />
            </Stack>
          </Box>
        </>
      )}
      <img
        src={`https://cheyni-prod.s3.eu-west-3.amazonaws.com/${video.thumbnail}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}
