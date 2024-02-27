import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { usePortal } from "src/providers/PortalProvider";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { Movie } from "src/types/Movie";
import { formatMinuteToReadable } from "src/utils/common";
import CheyniIconButton from "./CheyniIconButton";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import MaxLineTypography from "./MaxLineTypography";
import QualityChip from "./QualityChip";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import RemoveIcon from "@mui/icons-material/Remove";

interface VideoCardModalProps {
  video: Movie;
  anchorElement: HTMLElement;
}

export default function VideoCardModal({
  video,
  anchorElement,
}: VideoCardModalProps) {
  const navigate = useNavigate();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const setPortal = usePortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setDetailType } = useDetailModal();
  const [maxLine, setMaxLine] = useState(3);

  const handleMaxLine = () => {
    setMaxLine(maxLine === 3 ? 100 : 3);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        position: "relative",
        mb: 3,
        borderRadius: "20px",
        width: "750px", // Largura fixa desejada
        margin: "0 auto", // Centralizar o contêiner
        overflow: "hidden", // Adicione esta linha para ocultar conteúdo que ultrapassa
      }}
      onPointerLeave={() => {
        setPortal(null, null);
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          // height: "calc(9 / 16 * 100%)",
          borderRadius: "20px",
        }}
      >
        {/* <img src={`https://cheyni.s3.amazonaws.com/${detail.mediaDetail?.thumbnail}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
        <video
          src={`https://cheyni.s3.amazonaws.com/${video?.name}`}
          style={{
            width: "100%",
            height: "480px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
          autoPlay
          muted
          preload="auto"
          loop
          poster={`https://cheyni.s3.amazonaws.com/${video?.thumbnail}`}
        />
        {/* <IconButton
          onPointerLeave={() => {
            setDetailType({ mediaType: undefined, id: undefined });
          }}
          sx={{
            top: 15,
            right: 15,
            position: "absolute",
            bgcolor: "#181818",
            width: { xs: 22, sm: 40 },
            height: { xs: 22, sm: 40 },
            "&:hover": {
              bgcolor: isDarkMode ? "#0C0B30" : "#0C0B30",
            },
          }}
        >
          CLose
        </IconButton> */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 16,
            px: { xs: 2, sm: 3, md: 5 },
          }}
        >
          <MaxLineTypography
            variant="h4"
            maxLine={1}
            sx={{ mb: 2, color: "#FFF", fontFamily: "Play", mt: "8px" }}
            
          >
            {video.title}
          </MaxLineTypography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <PlayButton
              sx={{ color: isDarkMode ? "#fff" : "#0c0b30", borderRadius: 4 }}
              id={video?.id}
            />
            {/* <CheyniIconButton>
                    <AddIcon />
                  </CheyniIconButton>
                  <CheyniIconButton>
                    <ThumbUpOffAltIcon />
                  </CheyniIconButton> */}
            <Box flexGrow={1} />
            {/* <CheyniIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </CheyniIconButton> */}
          </Stack>

          <Container
            sx={{
              p: "20px !important",
              backgroundColor: isDarkMode ? "#0C0B30" : "#fff",
              borderRadius: 5,
              boxShadow: 6,
              opacity: "0.9",
              marginBottom: 5,
            }}
          >
            <Grid container spacing={5} alignItems="center" marginBottom={2}>
              <Grid item xs={12} sm={6} md={8}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">
                    {/* {detail.mediaDetail?.release_date.substring(0, 4)} */}
                  </Typography>
                  {/* <AgeLimitChip 
                          label={`${detail.mediaDetail?.title == "Black Swan" ? "16+" : 
                          detail.mediaDetail?.title == "The Girl with the Dragon Tattoo" ? "16+" : 
                          detail.mediaDetail?.title == "Jennifer's Body" ? "16+" : 
                          detail.mediaDetail?.title == "Donnie Darko" ? "14+" :
                          detail.mediaDetail?.title == "Sound of Freedom" ? "14+" : "18+"}`}
                        /> */}
                  {/* <Typography variant="subtitle2">{`${formatMinuteToReadable(
                          movieDetail?.runtime || 0
                        )}`}</Typography> */}
                  <QualityChip label="HD" sx={{ padding: 2, fontFamily: "Futura Regular" }} />
                  <QualityChip label="Watch & Earn" sx={{ padding: 2, fontFamily: "Futura Regular"  }} />
                  <QualityChip label={video.genre} sx={{ padding: 2, fontFamily: "Futura Regular"  }} />
                </Stack>
              </Grid>
            </Grid>
            <b style={{ fontFamily: "Play" }}>
              Log Line:
            </b>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Helvetica Neue",
                fontWeight: 50,
                fontSize: 10,
              }}
            >
              {video?.description}
            </Typography>
            <b style={{ fontFamily: "Play", marginTop:"4px" }}>Genre:</b>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Helvetica Neue",
                fontWeight: 50,
                fontSize: 12,
              }}
            >
              {video?.genre}
            </Typography>
          </Container>
        </Box>
      </Box>
      {/* {similarVideos && similarVideos.results.length > 0 && (
              <Container
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                // <Typography variant="h6" sx={{ mb: 2 }}>
                //   More Like This
                // </Typography>
                // <Grid container spacing={2}>
                //   {similarVideos.results.map((sm) => (
                //     <Grid item xs={6} sm={4} key={sm.id}>
                //       <SimilarVideoCard video={sm} />
                //     </Grid>
                //   ))}
                // </Grid>
              </Container>
            )} */}
    </Box>
  );
}
