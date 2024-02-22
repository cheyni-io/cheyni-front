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
                src="./assets/CheyniLoopBackground.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%" }}
              />
              <Box
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
                  transition: "opacity .5s",
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
                  opacity: 0.8, // Adjust opacity as needed
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <img src="/assets/cLogo.png" alt="Cheyni" />
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "50%",
                  top: "30%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <IconButton>
                    <img src="/assets/c3.png" alt="Cheyni" />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    Watch community-curated Films <br /> & collect membership
                    NFTs
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      textAlign: "center",
                    }}
                  >
                    <IconButton>
                      <img src="/assets/bitcoin.png" alt="Cheyni" />
                    </IconButton>
                    <IconButton>
                      <img src="/assets/c1.png" alt="Cheyni" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="white">
                    Pay securely with <br /> Crypto & Credit Card
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    marginLeft: "50px",
                  }}
                >
                  <IconButton>
                    <img src="/assets/c3.png" alt="Cheyni" />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    Join exclusive communities & <br /> enjoy a premium journey
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                {/* <Button
                  variant="contained"
                  sx={{ 
                    borderRadius: "50px", 
                    padding: "10px 20px", 
                    backgroundColor: isDarkMode ? "#FFF" : "#191761", 
                    color: isDarkMode ? "#000" : "#FFF",
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#191761" : "#FFF",
                      color: isDarkMode ? "#FFF" : "#000",
                    },
                }}
                > */}
                <Typography variant="h5" color="white">
                  Watch & Earn
                </Typography>
                {/* </Button> */}
              </Stack>
              <Box
                sx={{
                  backgroundColor: "transparent",
                  backgroundImage: isDarkMode
                    ? "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#0C0B30 68%,#0C0B30)"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0.35) 29%, rgba(255, 255, 255, 0.58) 44%, #FFFFFF 68%, #FFFFFF)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  bottom: 0,
                  position: "absolute",
                  height: "14.7vw",
                  opacity: 1,
                  top: "auto",
                  width: "100%",
                }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                  position: "absolute",
                  right: 0,
                  bottom: "35%",
                }}
              >
                {/* <CheyniIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </CheyniIconButton> */}
                {/* <MaturityRate>{`${maturityRate}+`}
                  </MaturityRate> */}
              </Stack>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* <Stack
                  spacing={4}
                  sx={{
                    bottom: "35%",
                    position: "absolute",
                    left: { xs: "4%", md: "60px" },
                    top: 0,
                    width: "36%",
                    zIndex: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <MaxLineTypography
                    variant="h2"
                    maxLine={1}
                    color="text.primary"
                  >
                    Slow Food
                  </MaxLineTypography>
                  <MaxLineTypography
                    variant="h5"
                    maxLine={3}
                    color="text.primary"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </MaxLineTypography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <PlayButton size="large" />
                    <MoreInfoButton
                      size="large"
                      onClick={() => {
                        setDetailType({ mediaType, id: video.id });
                      }}
                    />
                  </Stack>
                </Stack> */}
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
}
