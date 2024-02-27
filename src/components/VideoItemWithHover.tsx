import { useEffect, useState, useRef } from "react";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";
interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoItemWithHover({ video, }: VideoItemWithHoverProps) {
  const setPortal = usePortal();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setPortal(elementRef.current, video);
    }
  }, [isHovered]);

  return (
    <VideoItemWithHoverPure
      ref={elementRef}
      handleHover={setIsHovered}
      src={`https://cheyni.s3.amazonaws.com/${video.thumbnail}`}
    />
  );
}
