import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import store from "src/store";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";
import SignIn from "src/components/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "src/store/slices/searchSlice";
import { Box, Theme, styled } from "@mui/material";
import Slider, { Settings } from "react-slick";
import VideoItemWithHoverPure from "src/components/VideoItemWithHoverPure";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { Movie } from "src/types/Movie";

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

// const RootStyle = styled("div")(() => ({
//   position: "relative",
//   overflow: "inherit",
// }));

function SlideItem({ item }: SlideItemProps) {
  console.log(item);
  return (
    <Box sx={{ pr: { xs: 0.5, sm: 1 }, mb: 10 }}>
      <VideoItemWithHover video={item} />
    </Box>
  );
}

export async function loader() {
  await store.dispatch(
    genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie)
  );
  return null;
}
export function Component() {
  const { data: genres, isSuccess } = useGetGenresQuery(MEDIA_TYPE.Movie);
  const navigate = useNavigate();
  //Obter token de acesso do localStorage
  const tokens = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const videos = useSelector((state) => state.search.results);

  console.log(videos);

  if (genres && tokens !== null) {
    return (
      <Stack spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />

        {videos.length > 0 ? (
          <>
            <Box
              sx={{
                overflow: "hidden",
                height: "100%",
                zIndex: 1,
                backgroundColor: "#fff",
              }}
            >
              <h2>Search Results</h2>
              {videos.map((item: Video) => (
                // <RootStyle>
<Box
  sx={{
    overflow: "hidden",
    height: "100%",
    zIndex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", // Adicionado para que os itens quebrem para a linha seguinte, se necessário
  }}
>
                    <Box sx={{ width: 300, height: 300 }}>
                      <SlideItem key={item.id} item={item} />
                    </Box>
                    </Box>
              ))}
            </Box>
          </>
        ) : (
          // Se os resultados da busca forem vazios, mostrar o SliderRowForGenre
          [...COMMON_TITLES, ...genres].map((genre: Genre | CustomGenre) => (
            <SliderRowForGenre
              key={genre.id || genre.name}
              genre={genre}
              mediaType={MEDIA_TYPE.Movie}
            />
          ))
        )}
      </Stack>
    );
  } else {
    navigate("/login");
    return (
      <Stack spacing={2}>
        <SignIn />
      </Stack>
    );
  }
}

Component.displayName = "HomePage";
