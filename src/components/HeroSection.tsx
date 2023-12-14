import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect, useMemo, useRef, useState } from "react";
import Player from "video.js/dist/types/player";

import { useTheme } from "@mui/material";
import useOffSetTop from "src/hooks/useOffSetTop";
import { useDetailModal } from "src/providers/DetailModalProvider";
import {
  useGetVideosByMediaTypeAndCustomGenreQuery,
  useLazyGetAppendedVideosQuery,
} from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { Movie } from "src/types/Movie";
import { getRandomNumber } from "src/utils/common";
import MaturityRate from "./MaturityRate";
import MaxLineTypography from "./MaxLineTypography";
import MoreInfoButton from "./MoreInfoButton";
import PlayButton from "./PlayButton";

interface TopTrailerProps {
  mediaType: MEDIA_TYPE;
}

export default function TopTrailer({ mediaType }: TopTrailerProps) {
  const data2 = {
    results: [
      {
        "adult": false,
        "backdrop_path": "/qxTw8OKJLRX1Xb5nR5CcIDnLKoq.jpg",
        "genre_ids": [
          18,
          53,
          27
        ],
        "id": 44214,
        "original_language": "en",
        "original_title": "Black Swan",
        "overview": "A journey through the psyche of a young ballerina whose starring role as the duplicitous swan queen turns out to be a part for which she becomes frighteningly perfect.",
        "popularity": 90.44,
        "poster_path": "/rH19vkjAzCZ0HIUvrgB3rowm68h.jpg",
        "release_date": "2010-12-03",
        "title": "Black Swan",
        "video": false,
        "vote_average": 7.677,
        "vote_count": 13700,
        "age": '16+'
      },
      {
        "adult": false,
        "backdrop_path": "/dPE25PbaeE6fCR2SQb4H4MeBmml.jpg",
        "genre_ids": [
          18,
          53,
          80,
          9648
        ],
        "id": 15472,
        "original_language": "sv",
        "original_title": "Män som hatar kvinnor",
        "overview": "Swedish thriller based on Stieg Larsson's novel about a male journalist and a young female hacker. In the opening of the movie, Mikael Blomkvist, a middle-aged publisher for the magazine Millennium, loses a libel case brought by corrupt Swedish industrialist Hans-Erik Wennerström. Nevertheless, he is hired by Henrik Vanger in order to solve a cold case, the disappearance of Vanger's niece",
        "popularity": 47.784,
        "poster_path": "/r2pFUXKK20KD9RE3yybpQsNynRE.jpg",
        "release_date": "2009-02-27",
        "title": "The Girl with the Dragon Tattoo",
        "video": false,
        "vote_average": 7.523,
        "vote_count": 2766,
        "age": '16+'
      },
      {
        "adult": false,
        "backdrop_path": "/pA3vdhadJPxF5GA1uo8OPTiNQDT.jpg",
        "genre_ids": [
          28,
          18
        ],
        "id": 678512,
        "original_language": "en",
        "original_title": "Sound of Freedom",
        "overview": "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
        "popularity": 263.457,
        "poster_path": "/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg",
        "release_date": "2023-07-03",
        "title": "Sound of Freedom",
        "video": false,
        "vote_average": 8.1,
        "vote_count": 1585,
        "age": '14+'
      },
    ]
  }

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { data } = useGetVideosByMediaTypeAndCustomGenreQuery({
    mediaType,
    apiString: "popular",
    page: 1,
  });
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<Player | null>(null);
  const isOffset = useOffSetTop(window.innerWidth * 0.5625);
  const { setDetailType } = useDetailModal();
  const maturityRate = useMemo(() => {
    return getRandomNumber(20);
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      if (isOffset) {
        playerRef.current.pause();
      } else {
        if (playerRef.current.paused()) {
          playerRef.current.play();
        }
      }
    }
  }, [isOffset]);

  useEffect(() => {
    if (data2 && data2.results) {
      const videos = data2.results.filter((item) => !!item.backdrop_path);
      setVideo(videos[getRandomNumber(videos.length)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (video) {
      getVideoDetail({ mediaType, id: video.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

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
          {video && (
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
                {detail && (
                  <img
                    src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
                    alt={detail.title}
                    width="100%"
                    height="100%"
                  />
                )}
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
                  <MaturityRate>{`${video.age}`}
                  </MaturityRate>
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
                <Stack
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
                    {video.title}
                  </MaxLineTypography>
                  <MaxLineTypography
                    variant="h5"
                    maxLine={3}
                    color="text.primary"
                  >
                    {video.overview}
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
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
