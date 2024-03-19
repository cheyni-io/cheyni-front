import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, Theme, useTheme } from "@mui/material/styles";

import CheyniNavigationLink from "src/components/CheyniNavigationLink";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "src/constant";
import { PaginatedMovieResult } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { Movie } from "src/types/Movie";
import CustomNavigation from "./CustomNavigation";
import api from "src/services/api";
import VideoFeaturedItemWithHover from "../VideoFeaturedItemWithHover";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RootStyle = styled("div")(() => ({
  position: "relative",
  overflow: "inherit",
}));

const StyledSlider = styled(Slider)(
  ({ theme, padding }: { theme: Theme; padding: number }) => ({
    display: "flex !important",
    justifyContent: "center",
    overflow: "initial !important",
    "& > .slick-list": {
      overflow: "visible",
    },
    [theme.breakpoints.up("sm")]: {
      "& > .slick-list": {
        width: `calc(100% - ${2 * padding}px)`,
      },
      "& .slick-list > .slick-track": {
        margin: "0px !important",
        marginLeft: "0px !important",
      },
      "& .slick-list > .slick-track > .slick-current > div > .NetflixBox-root > .NetflixPaper-root:hover":
        {
          transformOrigin: "0% 50% !important",
        },
    },
    [theme.breakpoints.down("sm")]: {
      "& > .slick-list": {
        width: `calc(100% - ${padding}px)`,
      },
      "& .slick-list > .slick-track": {
        marginLeft: "0px !important", // Define a margem esquerda como 0
      },
    },
  })
);

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
    <Box sx={{ pr: { xs: 0.5, sm: 1 }, mb: 10 }}>
      <VideoItemWithHover video={item} />
    </Box>
  );
}

function SlideItem2({ item }: SlideItemProps) {
  return (
    <Box sx={{ pr: { xs: 0.5, sm: 1 }, mb: 10, ml: 5, width: "280px" }}>
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
    slides: {
      perView: 6,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    // created() {
    //   console
    //   setLoaded(true);
    // },
  });

  const isDark = theme.palette.mode === "dark";

  const [sliderRef2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 6,
      spacing: 0,
    },
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

  const settings: Settings = {
    speed: genre.name === "Community Picked" ? 10000 : 500,
    arrows: false,
    infinite: false,
    lazyLoad: "progressive",
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    cssEase: "linear",
    beforeChange,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
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
            sx={{ mb: 2, mt: 5, pl: { xs: "30px", sm: "60px" } }}
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
              // <CustomNavigation
              //   isEnd={isEnd}
              //   arrowWidth={ARROW_MAX_WIDTH}
              //   onNext={handleNext}
              //   onPrevious={handlePrevious}
              //   activeSlideIndex={activeSlideIndex}
              // >
              //   <StyledSlider
              //     ref={sliderRef}
              //     {...settings}
              //     padding={ARROW_MAX_WIDTH}
              //     theme={theme}
              //   >
              //     {videos
              //       .filter(
              //         (item: Video) =>
              //           !!item.genre && item.genre.includes(genre.name)
              //       )
              //       .map((item: Video) => (
              //         <SlideItem key={item.id} item={item} />
              //       ))}
              //   </StyledSlider>
              // </CustomNavigation>
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
