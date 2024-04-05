import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";

import CheyniNavigationLink from "src/components/CheyniNavigationLink";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "src/constant";
import api from "src/services/api";
import { PaginatedMovieResult } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { Movie } from "src/types/Movie";
import VideoFeaturedItemWithHover from "../VideoFeaturedItemWithHover";
import CustomNavigation from "./CustomNavigation";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const RootStyle = styled("div")(() => ({
  position: "relative",
  overflow: "inherit",
}));

interface Video {
  id: string;
  genre: string;
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  age?: string;
  runtime?: number;
  thumbnail?: string;
}

interface SlideItemProps {
  item: Movie;
}

function SlideItem({ item }: SlideItemProps) {
  return (
    <Box
      sx={{
        pr: { xs: 0.5, sm: 1 },
        mb: { xs: 2, sm: 10, md: 10 },
        width: { xs: "140px", sm: "200px", md: "360px" },
      }}
    >
      <VideoItemWithHover video={item} />
    </Box>
  );
}

function SlideItem2({ item }: SlideItemProps) {
  return (
    <Box
      sx={{
        pr: { xs: 0.5, sm: 1 },
        mb: 10,
        ml: { xs: 2, sm: 2, md: 2},
        width: { xs: "180px", sm: "200px", md: "280px" },
      }}
    >
      <VideoFeaturedItemWithHover video={item} />
    </Box>
  );
}

const animation = { duration: 10000, easing: (t: number) => t };

interface SlickSliderProps {
  data: PaginatedMovieResult;
  genre: Genre | CustomGenre;
  handleNext: (page: number) => void;
}
export default function SlickSlider({ data, genre }: SlickSliderProps) {
  const sliderRef = useRef<Slider>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef3, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: "free",
    // slides: {
    //   perView: 6,
    //   spacing: 15,
    // },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 720px)": {
        loop: true,
        slides: {
          perView: 2,
          spacing: 5,
        },
      },
      "(min-width: 720px) and (max-width: 1000px)": {
        loop: true,
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(min-width: 1000px)": {
        loop: true,
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
      "(min-width: 1200px)": {
        loop: true,
        slides: {
          perView: 5,
          spacing: 10,
        },
      },
    },
  });

  const isDark = theme.palette.mode === "dark";

  const [sliderRef2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    // slides: {
    //   perView: 6,
    //   spacing: 0,
    // },
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(2, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation);
    },
    breakpoints: {
      '(max-width: 720px)': {
        loop: true,
        slides: {
          perView: 2,
          spacing: 5,
        }
      },
      '(min-width: 720px) and (max-width: 1000px)': {
        loop: true,
        slides: {
          perView: 3,
          spacing: 10,
        }
      },
      '(min-width: 1000px)': {
        loop: true,
        slides: {
          perView: 4,
          spacing: 10,
        }
      },
      '(min-width: 1200px)': {
        loop: true,
        slides: {
          perView: 5,
          spacing: 10,
        }
      },
    },
  });

  const tokens = localStorage.getItem("accessToken");

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/upload", { headers: { Authorization: `Bearer ${tokens}` } })
      .then((response) => {
        setVideos(response.data);
        setIsLoading(false);
      });
  }, []);

  const beforeChange = async (currentIndex: number, nextIndex: number) => {
    if (currentIndex < nextIndex) {
      setActiveSlideIndex(nextIndex);
    } else if (currentIndex > nextIndex) {
      setIsEnd(false);
    }
    setActiveSlideIndex(nextIndex);
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100%",
        zIndex: 1,
        backgroundColor: isDark ? "#0c0b30" : "#fff",
      }}
    >
      {videos.length > 0 && (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ mb: { xs: 2, sm: 4 }, mt: 5, pl: { xs: "30px", sm: "60px" } }}
          >
            <CheyniNavigationLink
              variant="h5"
              to={`/genre/${
                genre.id || genre.name.toLowerCase().replace(" ", "_")
              }`}
              sx={{
                display: "inline-block",
                fontWeight: 700,
              }}
              onMouseOver={() => {
                setShowExplore(true);
              }}
              onMouseLeave={() => {
                setShowExplore(false);
              }}
            >
              {`${genre.name} Movies `}
              {/* <MotionContainer
                open={showExplore}
                initial="initial"
                sx={{
                  display: "inline",
                  color: isDark ? "white" : "black",
                  fontWeight: 200,
                }}
              >
                {"Explore All".split("").map((letter, index) => (
                  <motion.span key={index} variants={varFadeIn}>
                    {letter}
                  </motion.span>
                ))}
              </MotionContainer> */}
            </CheyniNavigationLink>
          </Stack>

          <RootStyle>
            {genre.name === "Community Picked" ? (
              <Box ref={sliderRef2} className="keen-slider">
                {videos
                  .filter(
                    (item: Video) =>
                      !!item.genre && item.genre.includes(genre.name)
                  )
                  .map((item: Video) => (
                    <div key={item.id} className="keen-slider__slide">
                      <SlideItem2 item={item} />
                    </div>
                  ))}
              </Box>
            ) : (
              <div className="navigation-wrapper">
                <CustomNavigation
                  isEnd={isEnd}
                  arrowWidth={ARROW_MAX_WIDTH}
                  onNext={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  onPrevious={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  activeSlideIndex={currentSlide}
                >
                  <Box ref={sliderRef3} className="keen-slider" sx={{ ml: 5 }}>
                    {videos
                      .filter(
                        (item: Video) =>
                          !!item.genre && item.genre.includes(genre.name)
                      )
                      .map((item: Video) => (
                        <div className="keen-slider__slide number-slide1">
                          <SlideItem item={item} key={item.id} />
                        </div>
                      ))}
                  </Box>
                </CustomNavigation>
              </div>
            )}
          </RootStyle>
        </>
      )}
    </Box>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
