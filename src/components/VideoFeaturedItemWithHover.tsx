import { useEffect, useState, useRef } from "react";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import VideoFeaturedItemWithHoverPure from "./VideoFeaturedItemWithHoverPure";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoFeaturedItemWithHover({ video, }: VideoItemWithHoverProps) {
  const setPortal = usePortal();
  const navigate = useNavigate();
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
      // handleHover={setIsHovered}
      onClick={() => navigate(`/${MAIN_PATH.watch}/${video.id}`)}
      src={`https://cheyni-prod.s3.eu-west-3.amazonaws.com/${video.thumbnail}`}
      /* @ts-ignore */
      genre={video?.genre}
    />
  );
}
