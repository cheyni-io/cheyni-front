import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Player from "video.js/dist/types/player";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { SliderUnstyledOwnProps } from "@mui/base/SliderUnstyled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
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
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

import { PiHandCoinsThin } from "react-icons/pi";

import {
  PlayCircle,
} from "@mui/icons-material";

interface videoData {
  title: string;
  name: string;
  description: string;
  nftoken: {
    id: string;
    price: string;
  };
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
  const [seekToCalled, setSeekToCalled] = useState(false); // Novo estado para rastrear a chamada de handleSeekTo
  const [isPlaying, setIsPlaying] = useState(false); // Novo estado para rastrear se o vídeo está sendo reproduzido ou pausado
  const [hasToken, setHasToken] = useState(false); // Novo estado para rastrear se o usuário tem o token
  const [hasTokenModal, setHasTokenModal] = useState(false); // Novo estado para rastrear se o usuário tem o token
  const [isTokenAvailable, setIsTokenAvailable] = useState(true);

  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/upload/${watchId}`).then((res) => {
      setVideoData(res.data);
      setLoading(false);
    });
  }, [watchId]);

  const windowSize = useWindowSize();
  const videoJsOptions = {
    preload: "metadata",
    autoplay: false,
    controls: true,
    bigPlayButton: false,
    // responsive: true,
    // fluid: true,
    width: windowSize.width,
    height: windowSize.height,
    sources: [
      {
        src: `https://cheyni.s3.amazonaws.com/${videoData?.name}`,
        type: "video/mp4",
      },
    ],
  };

  //Get user token from local storage
  const token = localStorage.getItem("accessToken");
  const handlePlayerReady = function (player: Player): void {
    player.on("pause", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: true };
      });
      setIsPlaying(false);
      setHideTitle(false);
    });

    player.on("play", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: false };
      });
      setIsPlaying(true);
      setHideTitle(true);
    });

    player.on("timeupdate", () => {
      setPlayerState((draft) => {
        const playedSeconds = player.currentTime() as number; // Assegura que playedSeconds é do tipo number
        return { ...draft, playedSeconds };
      });
    });

    player.on("seeking", () => {
      setSeekToCalled(true);
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
  };

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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!seekToCalled && playerState.duration && playerState.playedSeconds) {
      if (playerState.duration - playerState.playedSeconds < 1) {
        if (videoData?.nftoken !== null) {
          if (hasToken === false) {
            setOpen(true);
          } else {
            alert("You already have the Token!");
          }
        } else {
          alert("This video does not have a Token!");
        }
      } else {
      }
    }
  }, [seekToCalled, playerState.duration, playerState.playedSeconds]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseHasToken = () => {
    setHasTokenModal(false);
  };

  const handleGetNFT = () => {
    api
      .post(
        `/nf-token-and-user`,
        {
          nftoken: videoData?.nftoken.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Token has been received!");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
        setOpen(false);
      });
  };

  useEffect(() => {
    if (videoData?.nftoken !== null && videoData?.nftoken !== undefined) {
      api
        .get(`/nf-token-and-user/has-token/${videoData?.nftoken.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setHasToken(response.data);
        });
    }
  }, [videoData?.nftoken, token]);

  useEffect(() => {
    if (videoData?.nftoken == null || videoData.nftoken == undefined) {
      setIsTokenAvailable(false)
    } else {
      setIsTokenAvailable(true)
    }
  }, [videoData?.nftoken])

  useEffect(() => {
    if (hasToken === true) {
      console.log('a')
      setHasTokenModal(true);
    }
  }, [hasToken]);

  const handleCloseIsTokenAvailable = () => {
    setIsTokenAvailable(false);
    playerRef.current?.play();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsTokenAvailable(false);
    }, 8000);
  }, []);

  const [secondsRemaining, setSecondsRemaining] = useState(8);

  useEffect(() => {
    let timer: any;

    if (isTokenAvailable && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTokenAvailable, secondsRemaining]);

  if (loading) {
    return <MainLoadingScreen />;
  }
  if (!!videoJsOptions.width) {
    return (
      <>
        <Dialog
          onClose={handleCloseHasToken}
          aria-labelledby="customized-dialog-title"
          open={hasTokenModal}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            You have the Token!
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseHasToken}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              You already have the Token for this video! You cannot get it
              again, but you can still watch the video.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseHasToken}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Token Available */}
        <Dialog
          onClose={handleCloseIsTokenAvailable}
          aria-labelledby="customized-dialog-title"
          open={isTokenAvailable}
          PaperProps={{
            style: {
              borderRadius: 10,
            },
          }}
        >
          <DialogTitle>Closing in {secondsRemaining}</DialogTitle>
          <DialogContent>
            <Box display="flex" justifyContent="center">
              <img src="../assets/nftArt.png" style={{ width: "50%" }} />
            </Box>
            <DialogContentText id="alert-dialog-description">
              This video has a token available, don't skip or speed up to
              acquire it
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseIsTokenAvailable}>
              Watch the video Now
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Get Token */}
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          PaperProps={{
            style: {
              borderRadius: 10,
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Box display="flex" justifyContent="center">
              <PiHandCoinsThin size={80} color="#3CF04E" />
            </Box>
            <Typography variant="h6" textAlign={"center"}>
              Token Available
            </Typography>
            <Typography sx={{ color: "#a3a2a2" }}>
              Now you can collect a portion of the Token!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleGetNFT}
              sx={{
                width: "100%",
                backgroundColor: "#3CF04E",
                padding: 1,
                color: "#FFF",
                borderRadius: 5,
              }}
            >
              Get Token
            </Button>
          </DialogActions>
        </Dialog>
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
              <Box
                px={2}
                sx={{
                  position: "absolute",
                  top: 75,
                  backgroundColor: dark ? "#0C0B30" : "#FFF",
                }}
              >
                <PlayerControlButton onClick={handleGoBack}>
                  <KeyboardBackspaceIcon />
                </PlayerControlButton>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  display: isPlaying ? "none" : "block",
                }}
              >
                <PlayCircle
                  sx={{
                    fontSize: 100,
                    color: dark ? "#FFF" : "#0C0B30",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (playerRef.current) {
                      if (isPlaying) {
                        playerRef.current.pause();
                      } else {
                        playerRef.current.play();
                      }
                    }
                  }}
                />
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
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: dark ? "#0C0B30" : "#FFF",
                }}
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
                    <Typography
                      variant="caption"
                      sx={{ color: dark ? "#FFF" : "#0C0B30" }}
                    >
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
                    <PlayerControlButton onClick={handleFullScreen}>
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
