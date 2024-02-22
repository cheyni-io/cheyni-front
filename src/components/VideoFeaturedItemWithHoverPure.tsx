import { Chip, Stack, Typography } from "@mui/material";
import { PureComponent, ForwardedRef, forwardRef } from "react";
import QualityChip from "./QualityChip";

type VideoItemWithHoverPureType = {
  src: string;
  innerRef: ForwardedRef<HTMLDivElement>;
  handleHover: (value: boolean) => void;
  name: string;
};

class VideoFeaturedItemWithHoverPure extends PureComponent<VideoItemWithHoverPureType> {
  render() {
    return (
      <div
        ref={this.props.innerRef}
        style={{
          zIndex: 9,
          cursor: "pointer",
          borderRadius: "10px",
          width: "100%",
          position: "relative",
          paddingBottom: "120%", // Ajuste para tornar o cartaz mais vertical e um pouco menor
          overflow: "hidden",
        }}
      >
        <img
          src={this.props.src}
          style={{
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "10px",
          }}
          onPointerEnter={() => {
            this.props.handleHover(true);
          }}
          onPointerLeave={() => {
            this.props.handleHover(false);
          }}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "8px", // Ajuste o espaçamento conforme necessário
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            color: "white",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Chip
            variant="outlined"
            sx={{
              borderRadius: "4px",
              p: 0.5,
              fontSize: 12,
              height: "100%",
              "& > span": { p: 0 },
              color: "white"
            }}
            label="HD"
          />
          <Chip
            variant="outlined"
            sx={{
              borderRadius: "4px",
              p: 0.5,
              fontSize: 12,
              height: "100%",
              "& > span": { p: 0 },
              color: "white"
            }}
            label={this.props.name}
          />
        </Stack>
      </div>
    );
  }
}

const VideoItemWithHoverRef = forwardRef<
  HTMLDivElement,
  Omit<VideoItemWithHoverPureType, "innerRef">
>((props, ref) => <VideoFeaturedItemWithHoverPure {...props} innerRef={ref} />);
VideoItemWithHoverRef.displayName = "VideoItemWithHoverRef";

export default VideoItemWithHoverRef;
