import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, Theme, useTheme } from "@mui/material/styles";

import MotionContainer from "src/components/animate/MotionContainer";
import { varFadeIn } from "src/components/animate/variants/fade/FadeIn";
import NetflixNavigationLink from "src/components/NetflixNavigationLink";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "src/constant";
import { PaginatedMovieResult } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { Movie } from "src/types/Movie";
import CustomNavigation from "./CustomNavigation";

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
      "& .slick-list > .slick-track > .slick-current > div > .NetflixBox-root > .NetflixPaper-root:hover":
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

interface SlideItemProps {
  item: Movie;
}

function SlideItem({ item }: SlideItemProps) {
  return (
    <Box sx={{ pr: { xs: 0.5, sm: 1 } }}>
      <VideoItemWithHover video={item} />
    </Box>
  );
}

//Mocked Data
const data2 = {
  results: [
    {
      "adult": false,
      "backdrop_path": "/qxTw8OKJLRX1Xb5nR5CcIDnLKoq.jpg",
      "genre_ids": [
        18,
        53,
        27
      ],
      "id": 44214,
      "original_language": "en",
      "original_title": "Black Swan",
      "overview": "A journey through the psyche of a young ballerina whose starring role as the duplicitous swan queen turns out to be a part for which she becomes frighteningly perfect.",
      "popularity": 90.44,
      "poster_path": "/rH19vkjAzCZ0HIUvrgB3rowm68h.jpg",
      "release_date": "2010-12-03",
      "title": "Black Swan",
      "video": false,
      "vote_average": 7.677,
      "vote_count": 13700,
    },
    {
      "adult": false,
      "backdrop_path": "/dPE25PbaeE6fCR2SQb4H4MeBmml.jpg",
      "genre_ids": [
        18,
        53,
        80,
        9648
      ],
      "id": 15472,
      "original_language": "sv",
      "original_title": "Män som hatar kvinnor",
      "overview": "Swedish thriller based on Stieg Larsson's novel about a male journalist and a young female hacker. In the opening of the movie, Mikael Blomkvist, a middle-aged publisher for the magazine Millennium, loses a libel case brought by corrupt Swedish industrialist Hans-Erik Wennerström. Nevertheless, he is hired by Henrik Vanger in order to solve a cold case, the disappearance of Vanger's niece",
      "popularity": 47.784,
      "poster_path": "/r2pFUXKK20KD9RE3yybpQsNynRE.jpg",
      "release_date": "2009-02-27",
      "title": "The Girl with the Dragon Tattoo",
      "video": false,
      "vote_average": 7.523,
      "vote_count": 2766
    },
    {
      "adult": false,
      "backdrop_path": "/aTmh5w201d86lt3juFk8tbK297Y.jpg",
      "genre_ids": [
        27,
        35
      ],
      "id": 19994,
      "original_language": "en",
      "original_title": "Jennifer's Body",
      "overview": "Jennifer, a gorgeous, seductive cheerleader takes evil to a whole new level after she's possessed by a sinister demon. Now it's up to her best friend to stop Jennifer's reign of terror before it's too late.",
      "popularity": 73.912,
      "poster_path": "/wrkjsGcFJxcQqR56kJUYAEKKg2T.jpg",
      "release_date": "2009-09-18",
      "title": "Jennifer's Body",
      "video": false,
      "vote_average": 5.913,
      "vote_count": 3502
    },
    {
      "adult": false,
      "backdrop_path": "/msCHK5Kh1YbdZ0zPJ2nzPUhhSN9.jpg",
      "genre_ids": [
        14,
        18,
        9648
      ],
      "id": 141,
      "original_language": "en",
      "original_title": "Donnie Darko",
      "overview": "After narrowly escaping a bizarre accident, a troubled teenager is plagued by visions of a large bunny rabbit that manipulates him to commit a series of crimes.",
      "popularity": 65.943,
      "poster_path": "/fhQoQfejY1hUcwyuLgpBrYs6uFt.jpg",
      "release_date": "2001-01-19",
      "title": "Donnie Darko",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
      "genre_ids": [
        53,
        80
      ],
      "id": 680,
      "original_language": "en",
      "original_title": "Pulp Fiction",
      "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
      "popularity": 104.335,
      "poster_path": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      "release_date": "1994-09-10",
      "title": "Pulp Fiction",
      "video": false,
      "vote_average": 8.489,
      "vote_count": 26243
    },
    {
      "adult": false,
      "backdrop_path": "/pA3vdhadJPxF5GA1uo8OPTiNQDT.jpg",
      "genre_ids": [
        28,
        18
      ],
      "id": 678512,
      "original_language": "en",
      "original_title": "Sound of Freedom",
      "overview": "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
      "popularity": 263.457,
      "poster_path": "/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg",
      "release_date": "2023-07-03",
      "title": "Sound of Freedom",
      "video": false,
      "vote_average": 8.1,
      "vote_count": 1585
    },
  ]
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

  const beforeChange = async (currentIndex: number, nextIndex: number) => {
    if (currentIndex < nextIndex) {
      setActiveSlideIndex(nextIndex);
    } else if (currentIndex > nextIndex) {
      setIsEnd(false);
    }
    setActiveSlideIndex(nextIndex);
  };

  const settings: Settings = {
    speed: 500,
    arrows: false,
    infinite: false,
    lazyLoad: "ondemand",
    slidesToShow: 6,
    slidesToScroll: 6,
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
      {data.results.length > 0 && (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ mb: 2, pl: { xs: "30px", sm: "60px" } }}
          >
            <NetflixNavigationLink
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
                sx={{ display: "inline", color: "success.main" }}
              >
                {"Explore All".split("").map((letter, index) => (
                  <motion.span key={index} variants={varFadeIn}>
                    {letter}
                  </motion.span>
                ))}
              </MotionContainer>
            </NetflixNavigationLink>
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
                {data2.results
                  .filter((i) => !!i.backdrop_path)
                  .map((item) => (
                    <SlideItem key={item.id} item={item} />
                  ))}
                {/* {data3.results
                  .filter((i) => !!i.backdrop_path)
                  .map((item) => (
                    <SlideItem key={item.id} item={item} />
                  ))} */}
              </StyledSlider>
            </CustomNavigation>
          </RootStyle>
        </>
      )}
    </Box>
  );
}
