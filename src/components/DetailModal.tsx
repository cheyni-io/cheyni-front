import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { useTheme } from "@mui/material";

import { useDetailModal } from "src/providers/DetailModalProvider";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import QualityChip from "./QualityChip";
import CheyniIconButton from "./CheyniIconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { INITIAL_DETAIL_STATE } from "src/constant";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal() {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  const { detail, setDetailType } = useDetailModal();
  const [maxLine, setMaxLine] = useState(3);
  
  const handleMaxLine = () => {
    setMaxLine(maxLine === 3 ? 100 : 3);
  }

  return (
    <Dialog
      fullWidth
      scroll="body"
      maxWidth="md"
      open={!!detail.mediaDetail}
      id="detail_dialog"
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ p: 0, bgcolor: darkMode ? "#0C0B30" : "#fff" }}>
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "calc(9 / 16 * 100%)",
            }}
          >
            <video src={`https://cheyni-prod.s3.eu-west-3.amazonaws.com/${detail.mediaDetail?.name}`} style={{ width: "100%", height: "500px", objectFit: "cover" }} autoPlay muted preload="auto" loop poster={`https://cheyni-prod.s3.eu-west-3.amazonaws.com/${detail.mediaDetail?.thumbnail}`} />
            <Box
              sx={{
                background: `linear-gradient(77deg,rgba(252, 252, 252, 0.6),transparent 85%)`,
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
                backgroundImage:
                  darkMode ? "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#0C0B30 68%, #0C0B30)" : "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#fff 68%,#fff)",
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
            <IconButton
                onClick={() => {
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
                  bgcolor:  darkMode ? "#0C0B30" : "#0C0B30",
                },
              }}
            >
              <CloseIcon
                sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
              />
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 16,
                px: { xs: 2, sm: 3, md: 5 },
              }}
            >
              <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                {detail.mediaDetail?.title}
              </MaxLineTypography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <PlayButton sx={{ color: darkMode ? "#fff" : "#0c0b30" }} id={detail.mediaDetail?.id} />
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
                  backgroundColor: darkMode ? "#0C0B30" : "#fff",
                  borderRadius: 2,
                  boxShadow: 6,
                }}
              >
                <Grid container spacing={5} alignItems="center">
                  <Grid item xs={12} sm={6} md={8} >
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
                      <QualityChip label="HD" />
                    </Stack>

                    <MaxLineTypography
                      maxLine={maxLine}
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      {detail.mediaDetail?.description}
                    </MaxLineTypography>
                    <CheyniIconButton onClick={handleMaxLine}>
                        {maxLine === 3 ? <AddIcon /> : <RemoveIcon />}
                      </CheyniIconButton>

                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {`Genres : ${detail.mediaDetail?.genre}`}
                    </Typography>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {/* {`Available in : ${detail.mediaDetail?.spoken_languages
                          .map((l) => l.name)
                          .join(", ")}`} */}
                    </Typography>
                  </Grid>
                </Grid>
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
      </DialogContent >
    </Dialog >
  );
  // }

  // return null;
}
