import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, Theme, useTheme } from "@mui/material/styles";

import MotionContainer from "src/components/animate/MotionContainer";
import { varFadeIn } from "src/components/animate/variants/fade/FadeIn";
import CheyniNavigationLink from "src/components/CheyniNavigationLink";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "src/constant";
import { PaginatedMovieResult } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { Movie } from "src/types/Movie";
import CustomNavigation from "./CustomNavigation";
import api from "src/services/api";
import VideoFeaturedItemWithHover from "../VideoFeaturedItemWithHover";
import { CircularProgress } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css/effect-fade";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
      },
      "& .slick-list > .slick-track > .slick-current > div > .CheyniBox-root > .CheyniPaper-root:hover":
        {
          transformOrigin: "0% 50% !important",
        },
    },
    [theme.breakpoints.down("sm")]: {
      "& > .slick-list": {
        width: `calc(100% - ${padding}px)`,
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
  const theme = useTheme();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isDark = theme.palette.mode === "dark";

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 6,
      spacing: 15,
    },
  });

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

  const settings: Settings = {
    speed: genre.name === "Community Picked" ? 10000 : 500,
    arrows: false,
    infinite: true,
    lazyLoad: "progressive",
    slidesToShow: videos.length > 6 ? 6 : videos.length,
    slidesToScroll: videos.length > 6 ? 6 : videos.length,
    autoplay: false,
    // dots: false,
    // infinite: true,
    // slidesToShow: 6,
    // slidesToScroll: 6,
    // autoplay: genre.name === "Community Picked" ? true : false,
    // speed: genre.name === "Community Picked" ? 10000 : 500,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
    // afterChange: (current) => {
    //   console.log("After Change", current);
    // },
    // beforeChange,

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

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  if (isLoading) <CircularProgress />;

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
                  <Box ref={ref} className="keen-slider" sx={{ pl: 5 }}>
                    {videos
                      .filter(
                        (item: Video) =>
                          !!item.genre && item.genre.includes(genre.name)
                      )
                      .map((item: Video) => (
                        <div key={item.id} className="keen-slider__slide number-slide">
                          <SlideItem key={item.id} item={item} />
                        </div>
                      ))}
                  </Box>
              //   </StyledSlider>
              // </CustomNavigation>
            )}
          </RootStyle>
        </>
      )}
    </Box>
  );
}
