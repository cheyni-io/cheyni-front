import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import store from "src/store";
import SignIn from "src/components/LoginScreen";

export function Component() {

  return (
    <Stack spacing={2}>
      <SignIn />
    </Stack>
  );
}


Component.displayName = "LoginPage";
