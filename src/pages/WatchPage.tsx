import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Player from "video.js/dist/types/player";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { SliderUnstyledOwnProps } from "@mui/base/SliderUnstyled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import useWindowSize from "src/hooks/useWindowSize";
import { formatTime } from "src/utils/common";

import MaxLineTypography from "src/components/MaxLineTypography";
import VolumeControllers from "src/components/watch/VolumeControllers";
import VideoJSPlayer from "src/components/watch/VideoJSPlayer";
import PlayerSeekbar from "src/components/watch/PlayerSeekbar";
import PlayerControlButton from "src/components/watch/PlayerControlButton";
import MainLoadingScreen from "src/components/MainLoadingScreen";
import api from "src/services/api";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import '.././utils/styles.css'

interface videoData {
  title: string;
  name: string;
  description: string;
}

export function Component() {
  const playerRef = useRef<Player | null>(null);
  const [playerState, setPlayerState] = useState({
    paused: false,
    muted: false,
    playedSeconds: 0,
    duration: 0,
    volume: 0.8,
    loaded: 0,
  });

  const navigate = useNavigate();
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const { watchId } = useParams();

  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState<videoData>();
  const [hideTitle, setHideTitle] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  useEffect(() => {
    api.get(`/upload/${watchId}`).then((res) => {
      setVideoData(res.data);
      setLoading(false);
    });
  }, [watchId]);

  const windowSize = useWindowSize();
  const videoJsOptions = {
    preload: "metadata",
    autoplay: true,
    controls: true,
    // responsive: true,
    // fluid: true,
    width: windowSize.width,
    height: windowSize.height,
    sources: [{
      src: `https://cheyni.s3.amazonaws.com/${videoData?.name}`,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = function (player: Player): void {
    player.on("pause", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: true };
      });
      setHideTitle(false);
    });

    player.on("play", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: false };
      });
      setHideTitle(true);
    });

    player.on("timeupdate", () => {
      setPlayerState((draft) => {
        const playedSeconds = player.currentTime() as number; // Assegura que playedSeconds é do tipo number
        return { ...draft, playedSeconds };
      });
    });

    player.one("durationchange", () => {
      setPlayerInitialized(true);
      setPlayerState((draft) => {
        const duration = player.duration() as number; // Assegura que duration é do tipo number
        return { ...draft, duration };
      });
    });

    playerRef.current = player;

    setPlayerState((draft) => {
      return { ...draft, paused: player.paused() };
    });
  };

  const handleVolumeChange: SliderUnstyledOwnProps["onChange"] = (_, value) => {
    playerRef.current?.volume((value as number) / 100);
    setPlayerState((draft) => {
      return { ...draft, volume: (value as number) / 100 };
    });
  };

  const handleSeekTo = (v: number) => {
    playerRef.current?.currentTime(v);
  };

  const handleGoBack = () => {
    navigate("/browse");
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (playerRef.current) {
      if (isFullScreen) {
        playerRef.current.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  }

  console.log(isFullScreen);

  const handleForward = () => {
    if (playerRef.current && playerRef.current.currentTime) {
      // Verifica se playerRef.current e playerRef.current.currentTime são ambos definidos
      const currentVideoTime = playerRef.current.currentTime();
      if (currentVideoTime !== undefined) {
        playerRef.current.currentTime(currentVideoTime + 10);
      }
    }
  };

  const handleBackward = () => {
    if (playerRef.current && playerRef.current.currentTime) {
      const currentVideoTime = playerRef.current.currentTime();
      if (currentVideoTime !== undefined) {
        playerRef.current.currentTime(Math.max(0, currentVideoTime - 10));
      }
    }
  };

  const handlePictureInPicture = () => {
    if (playerRef.current) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        playerRef.current.requestPictureInPicture();
      }
    }
  };

  if (loading) {
    return <MainLoadingScreen />;
  }
  if (!!videoJsOptions.width) {
    return (
      <>
        <Box
          sx={{
            position: "relative",
            backgroundColor: dark ? "#0C0B30" : "#FFF",
          }}
        >
          <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          {playerRef.current && playerInitialized && (
            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            >
              <Box px={2} sx={{ position: "absolute", top: 75 }}>
                <PlayerControlButton onClick={handleGoBack}>
                  <KeyboardBackspaceIcon />
                </PlayerControlButton>
              </Box>
              <Box
                px={2}
                sx={{
                  position: "absolute",
                  top: { xs: "40%", sm: "55%", md: "60%" },
                  left: 0,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                  }}
                  display={hideTitle ? "none" : "block"}
                >
                  {videoData?.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                  }}
                  lineHeight={1.5}
                  display={hideTitle ? "none" : "block"}
                >
                  {videoData?.description}
                </Typography>
              </Box>
              <Box
                px={{ xs: 1, sm: 2 }}
                sx={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: dark ? "#0C0B30" : "#FFF" }}

              >
                {/* Seekbar */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PlayerSeekbar
                    playedSeconds={playerState.playedSeconds}
                    duration={playerState.duration}
                    seekTo={handleSeekTo}
                  />
                </Stack>
                {/* end Seekbar */}

                {/* Controller */}
                <Stack direction="row" alignItems="center">
                  {/* left controller */}
                  <Stack
                    direction="row"
                    spacing={{ xs: 0.5, sm: 1.5, md: 2 }}
                    alignItems="center"
                  >
                    {!playerState.paused ? (
                      <PlayerControlButton
                        onClick={() => {
                          playerRef.current?.pause();
                        }}
                      >
                        <PauseIcon />
                      </PlayerControlButton>
                    ) : (
                      <PlayerControlButton
                        onClick={() => {
                          playerRef.current?.play();
                        }}
                      >
                        <PlayArrowIcon />
                      </PlayerControlButton>
                    )}
                    <PlayerControlButton onClick={handleBackward}>
                      <TbRewindBackward10 />
                    </PlayerControlButton>
                    <PlayerControlButton onClick={handleForward}>
                      <TbRewindForward10 />
                    </PlayerControlButton>
                    <VolumeControllers
                      muted={playerState.muted}
                      handleVolumeToggle={() => {
                        playerRef.current?.muted(!playerState.muted);
                        setPlayerState((draft) => {
                          return { ...draft, muted: !draft.muted };
                        });
                      }}
                      value={playerState.volume}
                      handleVolume={handleVolumeChange}
                    />
                    <Typography variant="caption" sx={{ color: dark ? "#FFF" : "#0C0B30" }}>
                      {`${formatTime(playerState.playedSeconds)} / ${formatTime(
                        playerState.duration
                      )}`}
                    </Typography>
                  </Stack>
                  {/* end left controller */}

                  {/* middle time */}
                  <Box flexGrow={1}>
                    <MaxLineTypography
                      maxLine={1}
                      variant="subtitle1"
                      textAlign="center"
                      sx={{ maxWidth: 300, mx: "auto", color: "black" }}
                    >
                      {videoData?.title}
                    </MaxLineTypography>
                  </Box>
                  {/* end middle time */}

                  {/* right controller */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5, sm: 1.5, md: 2 }}
                  >
                    {/* <PlayerControlButton>
                    <SettingsIcon />
                  </PlayerControlButton> */}
                    <PlayerControlButton onClick={handlePictureInPicture}>
                      <BrandingWatermarkOutlinedIcon />
                    </PlayerControlButton>
                    <PlayerControlButton
                      onClick={handleFullScreen}
                    >
                      <FullscreenIcon />
                    </PlayerControlButton>
                  </Stack>
                  {/* end right controller */}
                </Stack>
                {/* end Controller */}
              </Box>
            </Box>
          )}
          {/* {isFullScreen ?
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: dark ? "#0C0B30" : "#FFF", zIndex: 2147483647 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
                {videoData?.title}
              </Typography>
              <Typography variant="h6" sx={{ color: "white" }} lineHeight={1.5}>
                {videoData?.description}
              </Typography>
            </Box>
            : null
            } */}
          
        </Box>
      </>
    );
  }
  return null;
}

Component.displayName = "WatchPage";
