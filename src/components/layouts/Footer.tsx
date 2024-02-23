import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Stack, IconButton, Button, ButtonGroup } from "@mui/material";

export default function Footer() {
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
                src="./assets/footerVideo.mp4"
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
                  backgroundImage: `url('./assets/transparentDot.png')`,
                  backgroundSize: "10%", // Ou experimente outros valores como "50%" ou "auto"
                  opacity: 0.5,
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
                  opacity: "65%", // Adjust opacity as needed
                }}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "50%",
                  top: "20%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <img
                    src="/assets/logo-light.png"
                    alt="Cheyni"
                    style={{ width: "40%" }}
                  />
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ borderWidth: 1, borderColor: "white", mr: 2, ml: 2 }}
                  />
                  <Typography color="#FFF">
                    UNLOCK LOYALTY WITH <b>STREAMMING COLLECTIBLES</b>
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
}
