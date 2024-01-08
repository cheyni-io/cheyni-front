import { CustomGenre } from "src/types/Genre";

export const API_ENDPOINT_URL = import.meta.env.VITE_APP_API_ENDPOINT_URL;
export const TMDB_V3_API_KEY = import.meta.env.VITE_APP_TMDB_V3_API_KEY;
export const API_RAILWAY_URL = import.meta.env.VITE_APP_API_RAILWAY_URL;

export const MAIN_PATH = {
  root: "",
  browse: "browse",
  genreExplore: "genre",
  watch: "watch",
  login: "login",
  signup: "signup",
  profile: "profile",
};

export const ARROW_MAX_WIDTH = 60;
export const COMMON_TITLES: CustomGenre[] = [
  { name: "Popular", apiString: "popular" },
  // { name: "Top Rated", apiString: "top_rated" },
  // { name: "Now Playing", apiString: "now_playing" },
  // { name: "Upcoming", apiString: "upcoming" },
];

export const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
export const APP_BAR_HEIGHT = 70;

export const INITIAL_DETAIL_STATE = {
  id: undefined,
  mediaType: undefined,
  mediaDetail: undefined,
};
