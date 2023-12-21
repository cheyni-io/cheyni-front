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
  const tokens = localStorage.getItem('accessToken');
  
  console.log("Token no componente:", tokens);

  if (genres && tokens !== null) {
    return (
      <Stack spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        {[...COMMON_TITLES, ...genres].map((genre: Genre | CustomGenre) => (
          <SliderRowForGenre
            key={genre.id || genre.name}
            genre={genre}
            mediaType={MEDIA_TYPE.Movie}
          />
        ))}
      </Stack>
    );
  } else {
    navigate('/login');
    return (
      <Stack spacing={2}>
        <SignIn />
      </Stack>
    )
  }
}

Component.displayName = "HomePage";
