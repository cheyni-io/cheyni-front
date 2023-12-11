import { Stack } from "@mui/material";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { SliderUnstyledOwnProps } from "@mui/base/SliderUnstyled";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayerControlButton from "./PlayerControlButton";

const StyledSlider = styled(Slider)({
  height: 5,
  borderRadius: 0,
  padding: 0,
  "& .NetflixSlider-track": {
    border: "none",
    backgroundColor: "#191761",
  },
  "& .NetflixSlider-rail": {
    border: "none",
    backgroundColor: "#FFF",
    opacity: 0.85,
  },
  "& .NetflixSlider-thumb": {
    height: 12,
    width: 10,
    backgroundColor: "#191761",
    "&:focus, &:hover, &.Netflix-active, &.Netflix-focusVisible": {
      boxShadow: "inherit",
      height: 17,
      width: 15,
    },
    "&:before": {
      display: "none",
    },
  },
});

export default function VolumeControllers({
  value,
  handleVolume,
  handleVolumeToggle,
  muted,
}: {
  value: number;
  handleVolume: SliderUnstyledOwnProps["onChange"];
  handleVolumeToggle: React.MouseEventHandler<HTMLButtonElement>;
  muted: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={{ xs: 0.5, sm: 1 }}
      // sx={{
      //   "&:hover NetflixSlider-root": {
      //     display: "inline-block",
      //   },
      // }}
    >
      <PlayerControlButton onClick={handleVolumeToggle}>
        {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </PlayerControlButton>
      <StyledSlider
        max={100}
        value={value * 100}
        valueLabelDisplay="auto"
        valueLabelFormat={(x: number) => x}
        onChange={handleVolume}
        sx={{ width: { xs: 60, sm: 80, md: 100 } }}
      />
    </Stack>
  );
}
