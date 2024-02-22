import { useEffect, useState, useRef } from "react";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import VideoFeaturedItemWithHoverPure from "./VideoFeaturedItemWithHoverPure";

interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoFeaturedItemWithHover({ video, }: VideoItemWithHoverProps) {
  const setPortal = usePortal();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setPortal(elementRef.current, video);
    }
  }, [isHovered]);

  return (
    <VideoFeaturedItemWithHoverPure
      ref={elementRef}
      handleHover={setIsHovered}
      src={`https://cheyni.s3.amazonaws.com/${video.thumbnail}`}
      name={video.title}
    />
  );
}
