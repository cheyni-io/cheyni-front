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
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { useRef, useEffect } from "react";

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

  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Card
      onPointerLeave={() => {
        setPortal(null, null);
      }}
      sx={{
        width: rect.width * 1.4,
        height: "100%",
        marginTop: "calc(9 / 16 * 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <video
          src={`https://cheyni.s3.amazonaws.com/${video.name}`}
          style={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            backgroundPosition: "50%",
          }}
          autoPlay
          muted
          loop
          preload="auto"
          poster={`https://cheyni.s3.amazonaws.com/${video.thumbnail}`}
          
          //Executar apenas 10 segundos do vídeo
        />
        {/* <video 
          src={`https://cheyni.s3.amazonaws.com/${video.thumbnail}`} 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            backgroundPosition: "50%",
          }}
        /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            left: 0,
            right: 0,
            bottom: 0,
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "4px",
            position: "absolute",
          }}
        >
          <MaxLineTypography
            maxLine={2}
            sx={{ width: "80%", fontWeight: 700 }}
            variant="h6"
            color="#FFF"
          >
            {video.title}
          </MaxLineTypography>
          <div style={{ flexGrow: 1 }} />
          {/* <CheyniIconButton>
            <VolumeUpIcon />
          </CheyniIconButton> */}
        </div>
      </div>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <CheyniIconButton
              sx={{ p: 0 }}
              onClick={() => navigate(`/${MAIN_PATH.watch}/${video.id}`)}
            >
              <PlayCircleIcon sx={{ width: 40, height: 40 }} />
            </CheyniIconButton>
            {/* <CheyniIconButton>
              <AddIcon />
            </CheyniIconButton>
            <CheyniIconButton>
              <ThumbUpOffAltIcon />
            </CheyniIconButton> */}
            <div style={{ flexGrow: 1 }} />
            <MaxLineTypography 
              variant="body2" 
              sx={{ color: isDarkMode ? "#FFF" : "#0c0b30", width: "40%", textAlign: "left" }}
              maxLine={1}
            >
              {video.description}
            </MaxLineTypography>
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center",
                borderColor: "#cfd8dc",
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: 2, 
                padding: "4px 8px",
                cursor: "pointer",
                boxShadow: 1,
                ":hover": {
                  borderColor: "#fff",
                  backgroundColor: isDarkMode ? "#FFF" : "#0c0b30",
                  color: isDarkMode ? "#000" : "#FFF"
                }
              }}
              onClick={() => {
                // setDetailType({ mediaType: MEDIA_TYPE.Movie, id: video.id });
                setDetailType({ mediaType: MEDIA_TYPE.Movie, id: video.id });
              }}
            >
              
              <Typography variant="subtitle2">
                More Info
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <AgeLimitChip label={`${video.title == "Black Swan" ? "16+" :
              video.title == "The Girl with the Dragon Tattoo" ? "16+" :
                video.title == "Jennifer's Body" ? "16+" :
                  video.title == "Donnie Darko" ? "14+" :
                    video.title == "Sound of Freedom" ? "14+" : "18+"}`}
            /> */}
            <Typography variant="subtitle2">{`${formatMinuteToReadable(
              video.title == "Generation Z" ? 3 :
                video.title == "Mascara" ? 4 :
                  video.title == "Travva" ? 2 :
                    video.title == "United Creators" ? 5 :
                      video.title == "Assosyal Otel" ? 4 :
                        video.title == "Bihrat Mavitan" ? 1 :
                        video.title == "Billie Eilish x T-Mobile" ? 2 :
                        video.title == "Film Ekimi" ? 1 : 
                        video.title == "Kadınlar Günü" ? 2 :
                        video.title == "Google Pixel" ? 3 :
                        video.title == "Huawei P Smart" ? 1 : 
                        video.title == "Jannis Kounellis" ? 1 :
                        video.title == "Kids for Kids" ? 1 :
                        video.title == "Mark Knight" ? 1 :
                        video.title == "Nike - Lightspeed" ? 1 :
                        video.title == "Rain Seed Nutrition" ? 1 :
                        video.title == "Skate Nation - Facebook" ? 2 : 4 
                        
            )}`}</Typography>
            <QualityChip label="HD" />
          </Stack>
          {/* {genres && (
            <GenreBreadcrumbs
              genres={genres
                .filter((genre) => video.genre_ids.includes(genre.id))
                .map((genre) => genre.name)}
            />
          )} */}
        </Stack>
      </CardContent>
    </Card>
  );
}
