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
    //Branded Content
    {
      "adult": false,
      "backdrop_path": "/hjMtzqK.png",
      "genre_ids": [
        28, 16
      ],
      "id": 5,
      "original_language": "en",
      "original_title": "Assosyal Otel",
      "overview": "Behramkale's preserved stone houses offer an oasis unchanged by time. Experience century-old interiors tailored to your needs—nothing excessive, nothing missing. Amidst ancient city walls, not skyscrapers, find solace devoid of city chaos. No TVs, no pollution—just nature's symphony. Witness sunrise in our garden, sunset at the temple, and embrace Kadırga beach's azure waters. 'Associative' grants every heart's desire, whether it's an old moonlit night or a canvas of stars. Your haven awaits, free from city clamor.",
      "popularity": 90.44,
      "poster_path": "/hjMtzqK.png",
      "release_date": "2010-12-03",
      "title": "Assosyal Otel",
      "video": false,
      "vote_average": 7.677,
      "vote_count": 13700
    },
    {
      "adult": false,
      "backdrop_path": "/lSMS9oG.png",
      "genre_ids": [
        12,
      ],
      "id": 1,
      "original_language": "en",
      "original_title": "Generation Z",
      "overview": "Generation Z, colloquially known as zoomers, is the demographic cohort succeeding millennials and preceding Generation Alpha. Researchers and popular media use the mid-to-late 1990s as starting birth years and the early 2010s as ending birth years.",
      "popularity": 65.943,
      "poster_path": "/lSMS9oG.png",
      "release_date": "2001-01-19",
      "title": "Generation Z",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/sQ9xUjc.png",
      "genre_ids": [
        12,
      ],
      "id": 2,
      "original_language": "en",
      "original_title": "Mascara",
      "overview": "Can Eren, an award-winning artist, navigates the convergence of philosophy and daily happenstance, unraveling collective consciousness. His mission intertwines art, tech, business, and modern life, probing existential concepts. Through dynamic cultural ventures, he shares this journey, sparking contemplation and exploration. As an art-driven entrepreneur, his avant-garde projects urge reflection, offering a unique lens on our reality by merging fragmented phenomena and emerging ideas, fostering mass engagement.",
      "popularity": 65.943,
      "poster_path": "/sQ9xUjc.png",
      "release_date": "2001-01-19",
      "title": "Mascara",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/xrJGGGb.png",
      "genre_ids": [
        12,
      ],
      "id": 3,
      "original_language": "en",
      "original_title": "Travva",
      "overview": "Meet Camille Marotte, a French director and photographer famed for his cinematic prowess. Combining tech passion with an eye for natural beauty, he crafts emotionally charged stories in stunning style. Graduating from the E-Art Institute in Paris, he swiftly directed for top-tier clients—Ralph Lauren, Hugo Boss, Maybelline, Calvin Klein—garnering acclaim with 3 Vimeo Staff Picks. His portfolio spans luxury brands like Cartier, Piaget, BMW, and collaborations with Omega, Chanel, and more, showcasing a delicate yet powerful cinematic flair across fashion, cars, tech, and luxury realms.",
      "popularity": 65.943,
      "poster_path": "/xrJGGGb.png",
      "release_date": "2001-01-19",
      "title": "Travva",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/BDu45oq.png",
      "genre_ids": [
        28, 16
      ],
      "id": 6,
      "original_language": "sv",
      "original_title": "Bihrat Mavitan",
      "overview": "Bihrat Mavitan, participating in numerous collective exhibitions, organizing solo exhibitions, and receiving awards, works in both sculpture and painting. Utilizing materials like metal, leather, and bronze in his sculptures, he creates original works inspired by his dreams, presenting figurative and decorative styles",
      "popularity": 47.784,
      "poster_path": "/BDu45oq.png",
      "release_date": "2009-02-27",
      "title": "Bihrat Mavitan",
      "video": false,
      "vote_average": 7.523,
      "vote_count": 2766
    },
    {
      "adult": false,
      "backdrop_path": "/aZwnrSi.png",
      "genre_ids": [
        28, 16
      ],
      "id": 7,
      "original_language": "en",
      "original_title": "Billie Eilish x T-Mobile",
      "overview": "Deutsche Telekom partners with Billie Eilish to highlight Gen Z's positive phone usage. Using Eilish's song When the Party’s Over the ad portrays screen-centric youth engaged in real-world activism. Launching on International Youth Day, the campaign urges showcasing online actions offline. Directed by Vincent Haycock, the ad emphasizes social impact. Accompanied by BTS interviews, it echoes Eilish's advocacy work. Similar to Three's approach, it celebrates smartphones in modern activism.",
      "popularity": 73.912,
      "poster_path": "/aZwnrSi.png",
      "release_date": "2009-09-18",
      "title": "Billie Eilish x T-Mobile",
      "video": false,
      "vote_average": 5.913,
      "vote_count": 3502
    },
    {
      "adult": false,
      "backdrop_path": "/BS5TDLR.png",
      "genre_ids": [
        28,
        35
      ],
      "id": 8,
      "original_language": "en",
      "original_title": "Jannis Kounellis",
      "overview": "Kounellis, spanning 1960 to the 1980s, revolutionized art, blending painting, sculpture, and performance. From stenciled urban imagery on canvases to integrating found objects like live animals, fire, and bed frames, his avant-garde approach defied traditional art. By the '80s, his unconventional materials and performances captivated Europe, securing his place in esteemed international museum collections.",
      "popularity": 65.943,
      "poster_path": "/BS5TDLR.png",
      "release_date": "2001-01-19",
      "title": "Jannis Kounellis",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/D6gP9yF.png",
      "genre_ids": [
        28, 16
      ],
      "id": 9,
      "original_language": "en",
      "original_title": "Huawei P Smart",
      "overview": "Huawei Ireland capitalizes on TikTok's allure with a campaign featuring Tadhg Fleming and his father. Riding a wave of TikTok fame post-lockdown, the duo stars in promoting the Huawei P Smart 2021. With Irish smartphone usage soaring, this integrated campaign spans PR, social, influencer marketing, TV, and a bespoke TikTok challenge. Expectations? Over 10m impressions and a significant digital impact.",
      "popularity": 65.943,
      "poster_path": "/D6gP9yF.png",
      "release_date": "2001-01-19",
      "title": "Huawei P Smart",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/LnNMx3i.png",
      "genre_ids": [
        28, 16
      ],
      "id": 10,
      "original_language": "en",
      "original_title": "Kids for Kids",
      "overview": "The Kyiv Volunteer Charity Foundation spearheads a heartwarming initiative, 'Kids for Kids,' aiming to bridge the gap between children amidst conflict. This project empowers distant youngsters to curate personalized care packages destined for their counterparts in Ukraine. Each contributing child fills a box with cherished items akin to sharing with a best friend: toys, secret-filled notebooks, superhero socks, sentimental tokens like pebbles or seashells, treats, and heartfelt letters. Through these carefully crafted parcels, they transcend geographical boundaries, nurturing solidarity and reminding both sides of the joy of receiving love and warmth.      . With Irish smartphone usage soaring, this integrated campaign spans PR, social, influencer marketing, TV, and a bespoke TikTok challenge. Expectations? Over 10m impressions and a significant digital impact.",
      "popularity": 65.943,
      "poster_path": "/LnNMx3i.png",
      "release_date": "2001-01-19",
      "title": "Kids for Kids",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/bR02GCV.png",
      "genre_ids": [
        28,
        18
      ],
      "id": 11,
      "original_language": "en",
      "original_title": "Mark Knight",
      "overview": "Mark Knight, a British DJ and founder of Toolroom Records, shaped the UK's dance scene. His label hosts icons like David Guetta, Deadmau5, and more. Grammy-nominated for work on Black Eyed Peas' album, he's known for hits like 'Man with the Red Face' and 'Second Story.' His albums, 'A Year in the Life' and 'Untold Business,' solidify his legacy in electronic music. Knight's recent collaboration 'Get with You Tonight' garnered praise in 2022.",
      "popularity": 65.943,
      "poster_path": "/bR02GCV.png",
      "release_date": "2001-01-19",
      "title": "Mark Knight",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/CA1hyfs.png",
      "genre_ids": [
        28, 16
      ],
      "id": 12,
      "original_language": "en",
      "original_title": "Nike - Lightspeed",
      "overview": "De'Aaron Martez Fox is an American professional basketball player for the Sacramento Kings of the National Basketball Association. He played college basketball for the Kentucky Wildcats before being selected fifth overall by the Kings in the 2017 NBA draft.",
      "popularity": 65.943,
      "poster_path": "/CA1hyfs.png",
      "release_date": "2001-01-19",
      "title": "Nike - Lightspeed",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/oiCkj9V.png",
      "genre_ids": [
        28, 12
      ],
      "id": 13,
      "original_language": "en",
      "original_title": "Rain Seed Nutrition",
      "overview": "Common Sense Science by The Seed Nutrition Co. believes in health through nature's most potent source: seeds. Our seed-based products, crafted by doctors and scientists, offer unparalleled health benefits. Founded on 11.11.11, Rain focuses on health, abundance, and giving back. Our synergistic products boost vitality while our sharing model offers financial freedom. Through our nonprofit Seeds For Change, we give thousands the opportunity for a better life. Join our unified family and experience the transformative power of Rain.",
      "popularity": 65.943,
      "poster_path": "/oiCkj9V.png",
      "release_date": "2001-01-19",
      "title": "Rain Seed Nutrition",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/afEoWgn.png",
      "genre_ids": [
        28, 16
      ],
      "id": 14,
      "original_language": "en",
      "original_title": "Skate Nation - Facebook",
      "overview": "Skate Nation Culture thrives on freedom, creativity, and inclusivity. We embrace individuality, defy boundaries, and build community through our shared passion. We celebrate diversity, amplify voices, and carve our paths with respect for each other and the world around us. Skateboarding is our art, our sport, our lifestyle—a canvas for expression and a catalyst for positive change.",
      "popularity": 65.943,
      "poster_path": "/afEoWgn.png",
      "release_date": "2001-01-19",
      "title": "Skate Nation - Facebook",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    //CHAPTERS
    {
      "adult": false,
      "backdrop_path": "/8Trl7gb.png",
      "genre_ids": [
        28, 16
      ],
      "id": 15,
      "original_language": "en",
      "original_title": "Google Pixel",
      "overview": "Young people forge their days with curiosity, resilience, and a hunger for connection. We navigate a digital landscape, balancing screens with human touch. We champion authenticity, nurture bonds, and celebrate diversity. In a world of constant change, we honor our mental health, seek meaningful experiences, and build relationships rooted in empathy, trust, and mutual growth.",
      "popularity": 65.943,
      "poster_path": "/8Trl7gb.png",
      "release_date": "2001-01-19",
      "title": "Google Pixel",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },
    {
      "adult": false,
      "backdrop_path": "/1X1nNiz.png",
      "genre_ids": [
        28, 18
      ],
      "id": 16,
      "original_language": "en",
      "original_title": "Film Ekimi",
      "overview": "The Istanbul Foundation for Culture and Arts (İKSV) is a pivotal non-profit institution enhancing Istanbul's cultural landscape since 1973. Renowned for its diverse festivals in music, film, theatre, jazz, and the iconic Istanbul Biennial, İKSV also hosts events at Salon İKSV and fosters creative programs for youth at İKSV Alt Kat. Their impactful initiatives extend globally, managing the Türkiye Pavilion at the Venice Biennale, contributing to cultural policy, supporting artistic endeavors through awards, commissions, and artist residencies. İKSV's role in UNESCO's Turkish National Commission underscores its commitment to cultural enrichment and global dialogue.",
      "popularity": 65.943,
      "poster_path": "/1X1nNiz.png",
      "release_date": "2001-01-19",
      "title": "Film Ekimi",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
    },


    //DANCE MOVIES
    {
      "adult": false,
      "backdrop_path": "/5HBoRzS.png",
      "genre_ids": [
        12,
      ],
      "id": 4,
      "original_language": "en",
      "original_title": "United Creators",
      "overview": "Meet Camille Marotte, a French director and photographer famed for his cinematic prowess. Combining tech passion with an eye for natural beauty, he crafts emotionally charged stories in stunning style. Graduating from the E-Art Institute in Paris, he swiftly directed for top-tier clients—Ralph Lauren, Hugo Boss, Maybelline, Calvin Klein—garnering acclaim with 3 Vimeo Staff Picks. His portfolio spans luxury brands like Cartier, Piaget, BMW, and collaborations with Omega, Chanel, and more, showcasing a delicate yet powerful cinematic flair across fashion, cars, tech, and luxury realms.",
      "popularity": 65.943,
      "poster_path": "/5HBoRzS.png",
      "release_date": "2001-01-19",
      "title": "United Creators",
      "video": false,
      "vote_average": 7.783,
      "vote_count": 11668
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
  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    api.get('/upload').then(response => {
      console.log(response.data);
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
                  .filter((item) => !!item.genre && item.genre.includes(genre.name))
                  .map((item) => (
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
