import { Company, Country, Language } from './Common';
import { Genre } from './Genre';

export type Appended_Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type MovieDetail = {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: Company[];
  production_countries?: Country[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Language[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  videos?: { results: Appended_Video[] };
  vote_average?: number;
  vote_count?: number;
  age?: string;
};

export type MovieDetails = {
  id: string;
  title: string;
  name: string; 
  genre: string;
  duration: string;
  thumbnail: string;
  description: string;
};

// Novo tipo para representar um array de MovieDetail
export type MovieDetailsArray = MovieDetails[];

export type Movie = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
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
};
