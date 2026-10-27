export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number | null;
  genres: Genre[];
};
