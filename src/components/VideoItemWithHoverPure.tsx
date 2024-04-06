import { PureComponent, ForwardedRef, forwardRef } from "react";

type VideoItemWithHoverPureType = {
  src: string;
  innerRef: ForwardedRef<HTMLDivElement>;
  handleHover: (value: boolean) => void;
};

class VideoItemWithHoverPure extends PureComponent<VideoItemWithHoverPureType> {
  render() {
    return (
      <div
        ref={this.props.innerRef}
        style={{
          zIndex: 1000,
          cursor: "pointer",
          borderRadius: 0.5,
          width: "100%",
          position: "relative",
          paddingTop: "56.25%", // Aspect ratio 16:9
        }}
      >
        <img
          src={this.props.src}
          style={{
            top: 0,
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
      </div>
    );
  }
}

const VideoItemWithHoverRef = forwardRef<
  HTMLDivElement,
  Omit<VideoItemWithHoverPureType, "innerRef">
>((props, ref) => <VideoItemWithHoverPure {...props} innerRef={ref} />);
VideoItemWithHoverRef.displayName = "VideoItemWithHoverRef";

export default VideoItemWithHoverRef;
