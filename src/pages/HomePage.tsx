import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import store from "src/store";
import SignIn from "src/components/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Theme, Typography, styled, useTheme } from "@mui/material";
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
function SlideItem({ item }: SlideItemProps) {
  return (
    <Box sx={{ pr: { xs: 0.5, sm: 1 }, mb: 10, ml: 5, width: "290px" }}>
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
  const tokens = localStorage.getItem("accessToken");
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";
  const videos = useSelector((state: any) => state.search.results);

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
                backgroundColor: isDark ? "#0c0b30" : "#fff",
              }}
            >
              <Typography variant="h5" sx={{ mt: 2, ml: 3, mb: 5 }}>
                {`Search Results: ${videos.length} videos`}
              </Typography>
              <Grid container spacing={2}>
                {videos.map((video: Video) => (
                  <SlideItem key={video.id} item={video} />
                ))}
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                overflow: "hidden",
                height: "100%",
                zIndex: 1,
                backgroundColor: isDark ? "#0c0b30" : "#fff",
              }}
            >
              {[...COMMON_TITLES, ...genres].map(
                (genre: Genre | CustomGenre) => (
                  <SliderRowForGenre
                    key={genre.id || genre.name}
                    genre={genre}
                    mediaType={MEDIA_TYPE.Movie}
                  />
                )
              )}
            </Box>
          </>
        )}
      </Stack>
    );
  } else {
    return (
      <Stack spacing={2}>
        <SignIn />
      </Stack>
    );
  }
}

Component.displayName = "HomePage";
