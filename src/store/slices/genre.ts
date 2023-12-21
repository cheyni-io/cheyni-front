import { TMDB_V3_API_KEY } from "src/constant";
import { Genre } from "src/types/Genre";
import { tmdbApi } from "./apiSlice";

const genres2 = {
  response: [
    {
      "id":28,
      "name": "Branded Content",
      "apiString": "action",
    },
    {
      "id":12,
      "name": "Dance",
      "apiString": "dance",
    },
    {
      "id":16,
      "name": "Short",
      "apiString": "short",
    },
    {
      "id": 18,
      "name": "Short Series", 
      "apiString": "short-series",
    },
    {
      "id": 35,
      "name": "Artist Documentary",
      "apiString": "artist-documentary",
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
