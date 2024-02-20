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

  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    api.get('/upload').then(response => {
      setVideos(response.data);
    })
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
    speed: 6000,
    arrows: false,
    infinite: true,
    lazyLoad: "anticipated",
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: genre.name === "Popular" ? true : false,
    autoplaySpeed: 0,
    cssEase: "linear",
    // afterChange: (current) => {
    //   console.log("After Change", current);
    // },
    beforeChange,
    // onEdge: (direction) => {
    //   console.log("Edge: ", direction);
    // },
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
  

  return (
    <Box sx={{ overflow: "hidden", height: "100%", zIndex: 1 }}>
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
              to={`/genre/${genre.id || genre.name.toLowerCase().replace(" ", "_")
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
              <MotionContainer
                open={showExplore}
                initial="initial"
                sx={{ 
                  display: "inline", 
                  color: isDark ? "white" : "black",
                  fontWeight: 200 
              }}
              >
                {"Explore All".split("").map((letter, index) => (
                  <motion.span key={index} variants={varFadeIn}>
                    {letter}
                  </motion.span>
                ))}
              </MotionContainer>
            </CheyniNavigationLink>
          </Stack>

          <RootStyle>
            <CustomNavigation
              isEnd={isEnd}
              arrowWidth={ARROW_MAX_WIDTH}
              onNext={handleNext}
              onPrevious={handlePrevious}
              activeSlideIndex={activeSlideIndex}
            >
              <StyledSlider
                ref={sliderRef}
                {...settings}
                padding={ARROW_MAX_WIDTH}
                theme={theme}
              >
                {/* {data2.results
                  .filter(item =>
                    // Verifica se genre.id está definido antes de usar em includes, incluir todos os filmes no top movies
                    !!genre.id ? item.genre_ids.includes(genre.id) : true
                  )
                  .map((item) => (
                    <SlideItem key={item.id} item={item} />
                  ))} */}

                {/* {data3.results
                  .filter((i) => !!i.backdrop_path)
                  .map((item) => (
                    <SlideItem key={item.id} item={item} />
                  ))} */}
                {/* {videos.filter((i) => !!i.backdrop_path).map((item) => (
                  <SlideItem key={item.id} item={item} />
                ))} */}
                {/* {videos.map((item) => (
                  // @ts-ignore
                  <SlideItem key={item?.id || ''} item={item || {}} />
                ))} */}
                {videos
                  .filter((item: Video) => !!item.genre && item.genre.includes(genre.name))
                  .map((item: Video) => (
                    <SlideItem key={item.id} item={item} />
                  ))}
              </StyledSlider>
            </CustomNavigation>
          </RootStyle>
        </>
      )}
    </Box>
  );
}
