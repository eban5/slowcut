import { OMDBResult } from "../types/types";
export const getMovieIds = (results: OMDBResult[]): string[] => {
	return results.map((i) => i.imdbID);
};

// TODO add params for resolution, lower res for stackedCards
export const buildPosterPath = (poster_path: string): string => {
	return `https://image.tmdb.org/t/p/w500/${poster_path}`;
};

// TODO write test
// release_date in TMDB API is YYYY-MM-DD
export const extractYear = (release_date: string): string => {
	return release_date.substr(0, 4);
};
