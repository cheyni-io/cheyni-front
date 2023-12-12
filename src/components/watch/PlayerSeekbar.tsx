import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import { formatTime } from "src/utils/common";

const StyledSlider = styled(Slider)({
  borderRadius: 0,
  "& .CheyniSlider-track": {
    backgroundColor: "#191761 !important",
    border: 0,
  },
  "& .CheyniSlider-rail": {
    border: "none",
    backgroundColor: "white !important",
    opacity: 0.85,
  },
  "& .CheyniSlider-thumb": {
    borderRadius: "50%",
    height: 10,
    width: 10,
    backgroundColor: "#191761",
    "&:focus, &:hover, &.Cheyni-active, &.Cheyni-focusVisible": {
      boxShadow: "inherit",
      height: 15,
      width: 15,
    },
    "&:before": {
      display: "none",
      boxShadow: "0 2px 2px 0 #fff",
      height: 10,
      width: 10,
    },
  },
  // "& .CheyniSlider-valueLabel": {
  //   lineHeight: 1.2,
  //   fontSize: 12,
  //   background: "unset",
  //   padding: 0,
  //   width: 32,
  //   height: 32,
  //   borderRadius: "50% 50% 50% 0",
  //   backgroundColor: "#52af77",
  //   transformOrigin: "bottom left",
  //   transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
  //   "&:before": { display: "none" },
  //   "&.CheyniSlider-valueLabelOpen": {
  //     transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
  //   },
  //   "& > *": {
  //     transform: "rotate(45deg)",
  //   },
  // },
});

function PlayerSeekbar({
  playedSeconds,
  duration,
  seekTo,
}: {
  playedSeconds: number;
  duration: number;
  seekTo: (value: number) => void;
}) {
  return (
    <StyledSlider
      valueLabelDisplay="auto"
      valueLabelFormat={(v) => formatTime(v)}
      // components={{
      //   ValueLabel: ValueLabelComponent,
      // }}
      value={playedSeconds}
      max={duration}
      onChange={(_, value) => {
        seekTo(value as number);
      }}
    />
  );
}

export default PlayerSeekbar;
