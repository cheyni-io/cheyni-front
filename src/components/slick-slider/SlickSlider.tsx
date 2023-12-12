import { useState, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { motion } from "framer-motion";

import { styled, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CustomNavigation from "./CustomNavigation";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "src/constant";
import NetflixNavigationLink from "src/components/CheyniNavigationLink";
import MotionContainer from "src/components/animate/MotionContainer";
import { varFadeIn } from "src/components/animate/variants/fade/FadeIn";
import { CustomGenre, Genre } from "src/types/Genre";
import { Movie } from "src/types/Movie";
import { PaginatedMovieResult } from "src/types/Common";

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
const data2 = [
  {
    "adult": false,
    "backdrop_path": "/zIYROrkHJPYB3VTiW1L9QVgaQO.jpg",
    "genre_ids": [
      28,
      35
    ],
    "id": 897087,
    "original_language": "en",
    "original_title": "Film One",
    "overview": "An ex-special forces operative takes a job to provide security for a journalist as she interviews a dictator, but a military coup breaks out in the middle of the interview, they are forced to escape into the jungle where they must survive.",
    "popularity": 1834.492,
    "poster_path": "/zDb5YeHSGGMlS6eqhUXcVU2OzAJ.jpg",
    "release_date": "2023-10-05",
    "title": "Film One",
    "video": false,
    "vote_average": 6.3,
    "vote_count": 217
  },
  {
    "adult": false,
    "backdrop_path": "/1X7vow16X7CnCoexXh4H4F2yDJv.jpg",
    "genre_ids": [
      80,
      18,
      36
    ],
    "id": 466420,
    "original_language": "en",
    "original_title": "Film Two",
    "overview": "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.",
    "popularity": 2277.914,
    "poster_path": "/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    "release_date": "2023-10-18",
    "title": "Film Two",
    "video": false,
    "vote_average": 7.687,
    "vote_count": 1304
  },
  {
    "adult": false,
    "backdrop_path": "/k1KrbaCMACQiq7EA0Yhw3bdzMv7.jpg",
    "genre_ids": [
      16,
      10751,
      10402,
      14,
      35
    ],
    "id": 901362,
    "original_language": "en",
    "original_title": "Film Three",
    "overview": "When Branch's brother, Floyd, is kidnapped for his musical talents by a pair of nefarious pop-star villains, Branch and Poppy embark on a harrowing and emotional journey to reunite the other brothers and rescue Floyd from a fate even worse than pop-culture obscurity.",
    "popularity": 1191.278,
    "poster_path": "/sEaLO9s7CIN3fjz8R3Qksum44en.jpg",
    "release_date": "2023-10-12",
    "title": "Film Three",
    "video": false,
    "vote_average": 7.158,
    "vote_count": 335
  },
  {
    "adult": false,
    "backdrop_path": "/jhpsTzbXEu5bkCPmBqxv7vUTjIT.jpg",
    "genre_ids": [
      14,
      12,
      878,
      28
    ],
    "id": 566810,
    "original_language": "en",
    "original_title": "Film Four",
    "overview": "To save their Kingdom from an army of undead, a group of warriors must travel through the forbidden lands fighting the fearsome beasts that call The Dark Kingdom their home.",
    "popularity": 966.892,
    "poster_path": "/o7StI2iR8yY1N67meSkNcXfojyD.jpg",
    "release_date": "2018-11-26",
    "title": "Film Four",
    "video": false,
    "vote_average": 5.286,
    "vote_count": 36
  },
  {
    "adult": false,
    "backdrop_path": "/yOm993lsJyPmBodlYjgpPwBjXP9.jpg",
    "genre_ids": [
      35,
      10751,
      14
    ],
    "id": 787699,
    "original_language": "en",
    "original_title": "Film Five",
    "overview": "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
    "popularity": 1174.577,
    "poster_path": "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
    "release_date": "2023-12-06",
    "title": "Film Five",
    "video": false,
    "vote_average": 7.2,
    "vote_count": 88
  },
  {
    "adult": false,
    "backdrop_path": "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    "genre_ids": [
      18,
      36
    ],
    "id": 872585,
    "original_language": "en",
    "original_title": "Film Six",
    "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    "popularity": 956.285,
    "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "release_date": "2023-07-19",
    "title": "Film Six",
    "video": false,
    "vote_average": 8.1,
    "vote_count": 5343
  },
  {
    "adult": false,
    "backdrop_path": "/mIpdOcss3oedSYB8juiSXg89uLL.jpg",
    "genre_ids": [
      28,
      878,
      12,
      53
    ],
    "id": 479753,
    "original_language": "en",
    "original_title": "Film Seven",
    "overview": "A stolen seismic weapon is activated in Yemen. A hostage freed there tries in vain to warn against its global effect. It starts seismic activity at the Californian fault line where her daughter and ex are monitoring it. Can they stop it?",
    "popularity": 867.656,
    "poster_path": "/sBD608VF4TcFHmP7SuC0OcvZQ0b.jpg",
    "release_date": "2017-09-02",
    "title": "Film Seven",
    "video": false,
    "vote_average": 5.577,
    "vote_count": 52
  },
  {
    "adult": false,
    "backdrop_path": "/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg",
    "genre_ids": [
      16,
      35,
      10751
    ],
    "id": 1075794,
    "original_language": "en",
    "original_title": "Film Eight",
    "overview": "Jaded 74-year-old lizard Leo has been stuck in the same Florida classroom for decades with his terrarium-mate turtle. When he learns he only has one year left to live, he plans to escape to experience life on the outside but instead gets caught up in the problems of his anxious students — including an impossibly mean substitute teacher.",
    "popularity": 1016.769,
    "poster_path": "/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg",
    "release_date": "2023-11-17",
    "title": "Film Eight",
    "video": false,
    "vote_average": 7.577,
    "vote_count": 512
  },
  {
    "adult": false,
    "backdrop_path": "/3xvdNyZ9WsVJpyeGhm85fukeZz4.jpg",
    "genre_ids": [
      878,
      9648,
      53
    ],
    "id": 1001835,
    "original_language": "en",
    "original_title": "Film Nine",
    "overview": "A grieving detective in the near-future hunts down criminals who trade artificial humans on the black market. In the fight to end AI exploitation, an underground resistance attempts to infiltrate him by sabotaging the programming of the artificial human assigned as his companion to behave like his late wife. She begins to question her reality as memories of a past life begin to surface in a world where nothing is as it seems.",
    "popularity": 778.03,
    "poster_path": "/tea2gDZPxw0wfKC2S2VRWHagtt4.jpg",
    "release_date": "2022-08-12",
    "title": "Film Nine",
    "video": false,
    "vote_average": 7.1,
    "vote_count": 191
  },
  {
    "adult": false,
    "backdrop_path": "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
    "genre_ids": [
      27,
      9648
    ],
    "id": 507089,
    "original_language": "en",
    "original_title": "Film Ten",
    "overview": "Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems.",
    "popularity": 701.906,
    "poster_path": "/7BpNtNfxuocYEVREzVMO75hso1l.jpg",
    "release_date": "2023-10-25",
    "title": "Film Ten",
    "video": false,
    "vote_average": 7.833,
    "vote_count": 2754
  }
]

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
                {data2.map((item) => (
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
