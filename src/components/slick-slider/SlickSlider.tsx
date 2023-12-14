import { motion } from "framer-motion";
import { useRef, useState } from "react";
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
      "vote_count": 13700
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
    {
      "adult": false,
      "backdrop_path": "/g2rhT5dKLsK2ATRw2ri39SdRciD.jpg",
      "genre_ids": [
        35,
        99
      ],
      "id": 1217902,
      "original_language": "en",
      "original_title": "I Know Feathers: The Annabel McConnachie Story",
      "overview": "Annabel McConnachie was a typical Australian girl in her early 20's - until one day, she wasn't. Come the 2022 release of book to movie adaptation 'Where the Crawdads Sing', everything changed. Overnight, Annabel from Sydney became Kya from North Carolina marsh land. Take an 8 minute deep dive into the psychosis and rampant delusion of an unhinged 24 year old method actor turned compulsive liar and witness the destruction her all-consuming fantasy has upon her friends, her family and ultimately herself.",
      "popularity": 0,
      "poster_path": "/cTSrcQZ1bWoaHcDN4vn6lsltwvp.jpg",
      "release_date": "2023-05-12",
      "title": "I Know Feathers: The Annabel McConnachie Story",
      "video": false,
      "vote_average": 10,
      "vote_count": 1
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
      "original_title": "Oppenheimer",
      "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
      "popularity": 818.431,
      "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      "release_date": "2023-07-19",
      "title": "Oppenheimer",
      "video": false,
      "vote_average": 8.135,
      "vote_count": 5379
    },
    {
      "adult": false,
      "backdrop_path": "/qF0q4ea83N1zwfStSsTCXvplY5I.jpg",
      "genre_ids": [
        10749,
        35
      ],
      "id": 1176139,
      "original_language": "en",
      "original_title": "Your Christmas or Mine 2",
      "overview": "They've swapped Christmas – again. Can Hayley and James' relationship survive another turbulent family Christmas or has their future together gone off-piste?!",
      "popularity": 236.971,
      "poster_path": "/zswSOwzHmP90XXsbdcAIKhchOKL.jpg",
      "release_date": "2023-12-07",
      "title": "Your Christmas or Mine 2",
      "video": false,
      "vote_average": 6.8,
      "vote_count": 33
    },
    {
      "adult": false,
      "backdrop_path": "/6eY3V5Exj0kEriaS2aLNHssi0je.jpg",
      "genre_ids": [
        10770,
        35,
        10749
      ],
      "id": 962367,
      "original_language": "en",
      "original_title": "When Christmas Was Young",
      "overview": "The story follows a headstrong music manager in desperate need of a hit song for his last remaining client, who finds himself falling for a gifted singer-songwriter with abandoned dreams of making it big, as he attempts to secure the rights to a Christmas song she wrote years ago.",
      "popularity": 77.597,
      "poster_path": "/6Fdku46UeJnny4xZK8E1sTVMBRe.jpg",
      "release_date": "2022-12-18",
      "title": "When Christmas Was Young",
      "video": false,
      "vote_average": 6.2,
      "vote_count": 10
    },
    {
      "adult": false,
      "backdrop_path": "/yQIBS8B9l2qXoPoPtxSXvH7CfoT.jpg",
      "genre_ids": [
        18,
        36,
        10752
      ],
      "id": 324786,
      "original_language": "en",
      "original_title": "Hacksaw Ridge",
      "overview": "WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.",
      "popularity": 91.038,
      "poster_path": "/jcStBvbQt78tPeId5hC7a9jcDOK.jpg",
      "release_date": "2016-10-07",
      "title": "Hacksaw Ridge",
      "video": false,
      "vote_average": 8.193,
      "vote_count": 12865
    },
    {
      "adult": false,
      "backdrop_path": "/LfUXJQOhBa0cfQsGnYwuSUaHId.jpg",
      "genre_ids": [
        37
      ],
      "id": 940175,
      "original_language": "en",
      "original_title": "A Tale of Two Guns",
      "overview": "In the lawless West, The Cowboys, a notorious brotherhood of killers and thieves, reigned over the land with brutal fists and fast guns. Fate had finally caught up with them and now the merciless gang has but a single surviving member. When a deputized gunslinger takes up the call to hunt down the last Cowboy, the chase is on and the bullets fly, and only one of these hardened men can survive.",
      "popularity": 529.134,
      "poster_path": "/kT3Zy7kOQERHnpEHT1wMwXEpJsk.jpg",
      "release_date": "2022-02-17",
      "title": "A Tale of Two Guns",
      "video": false,
      "vote_average": 6.278,
      "vote_count": 9
    },
    {
      "adult": false,
      "backdrop_path": "/gWCWHybWuVg3GmZpdY8qWGb85HR.jpg",
      "genre_ids": [
        10751,
        16,
        14,
        12,
        35,
        10402
      ],
      "id": 136799,
      "original_language": "en",
      "original_title": "Trolls",
      "overview": "After the monstrous Bergens invade Troll Village, Princess Poppy, the happiest Troll ever born, and overly-cautious, curmudgeonly outcast Branch set off on a journey to rescue her friends. Their mission is full of adventure and mishaps, as this mismatched duo try to tolerate each other long enough to get the job done.",
      "popularity": 101.744,
      "poster_path": "/9VlK2j0THZWzhQPq0W3Oc0IIdBB.jpg",
      "release_date": "2016-10-13",
      "title": "Trolls",
      "video": false,
      "vote_average": 6.668,
      "vote_count": 3372
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
      "original_title": "Dragon Kingdom",
      "overview": "To save their Kingdom from an army of undead, a group of warriors must travel through the forbidden lands fighting the fearsome beasts that call The Dark Kingdom their home.",
      "popularity": 721.477,
      "poster_path": "/o7StI2iR8yY1N67meSkNcXfojyD.jpg",
      "release_date": "2018-11-26",
      "title": "The Dark Kingdom",
      "video": false,
      "vote_average": 5.7,
      "vote_count": 41
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
                sx={{ display: "inline", color: "success.main" }}
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
                {data2.results
                  .filter(item =>
                    // Verifica se genre.id está definido antes de usar em includes, incluir todos os filmes no top movies
                    !!genre.id ? item.genre_ids.includes(genre.id) : true                   
                  )
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
