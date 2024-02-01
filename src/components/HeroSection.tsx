import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useTheme } from "@mui/material";

import { MEDIA_TYPE } from "src/types/Common";

interface TopTrailerProps {
  mediaType: MEDIA_TYPE;
}

export default function TopTrailer({ mediaType }: TopTrailerProps) {

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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
                    style={{width: "100%", height: "100%"}}
                  />
                <Box
                  sx={{
                    // background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                    background: isDarkMode ? "linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)" : "linear-gradient(77deg,rgba(255,255,255,.6),transparent 85%)",
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
                    backgroundColor: "transparent",
                    backgroundImage: isDarkMode ? "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#0C0B30 68%,#0C0B30)" : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0.35) 29%, rgba(255, 255, 255, 0.58) 44%, #FFFFFF 68%, #FFFFFF)",
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
