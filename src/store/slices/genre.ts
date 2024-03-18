import { TMDB_V3_API_KEY } from "src/constant";
import { Genre } from "src/types/Genre";
import { tmdbApi } from "./apiSlice";

//Genres
// Short Film - Ok
// Experimental Video
// Video Art
// Branded Content - Ok
// Documentary - Ok
// CHEYNI Originals
// Animation - ok
// Choreography - ok
// Fashion - ok

const genres2 = {
  response: [
    {
      "id":28,
      "name": "Branded Content",
      "apiString": "action",
    },
    {
      "id":12,
      "name": "Animation",
      "apiString": "animation",
    },
    {
      "id":16,
      "name": "Short",
      "apiString": "short",
    },
    {
      "id": 18,
      "name": "Choreography", 
      "apiString": "choreography",
    },
    {
      "id": 35,
      "name": "Documentary",
      "apiString": "documentary",
    },
    {
      "id": 37,
      "name": "Fashion",
      "apiString": "fashion",
    },
    {
      "id": 43,
      "name": "Experimental"
    },
    {
      "id": 44,
      "name": "Video Art"
    },
    {
      "id": 45,
      "name": "CHEYNI Originals"
    }
  ],
};

const extendedApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Genre[], string>({
      query: (mediaType) => ({
        url: `/genre/${mediaType}/list`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
      transformResponse: () => {
        // Aqui, você retorna diretamente o array de gêneros do objeto mockado
        return genres2.response;
      },
    }),
  }),
});



export const { useGetGenresQuery, endpoints: genreSliceEndpoints  } = extendedApi;
