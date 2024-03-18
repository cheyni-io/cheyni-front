import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Stack } from "@mui/material";
import Slider from "@mui/material/Slider";
import { styled, useTheme } from "@mui/material/styles";
import PlayerControlButton from "./PlayerControlButton";

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 5,
  borderRadius: 0,
  padding: 0,
  "& .CheyniSlider-track": {
    border: "none",
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#0c0b30",
  },
  "& .CheyniSlider-rail": {
    border: "none",
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#0c0b30",
    opacity: 0.85,
  },
  "& .CheyniSlider-thumb": {
    height: 12,
    width: 10,
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#0c0b30",
    "&:focus, &:hover, &.Cheyni-active, &.Cheyni-focusVisible": {
      boxShadow: "inherit",
      height: 17,
      width: 15,
    },
    "&:before": {
      display: "none",
    },
  },
}));

export default function VolumeControllers({
  value,
  handleVolume,
  handleVolumeToggle,
  muted,
}: {
  value: number;
  handleVolume: (event: Event, newValue: number | number[]) => void;
  handleVolumeToggle: React.MouseEventHandler<HTMLButtonElement>;
  muted: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={{ xs: 0.5, sm: 1 }}
      // sx={{
      //   "&:hover CheyniSlider-root": {
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
