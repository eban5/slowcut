import { OMDBResult } from "../types";
export const getMovieIds = (results: OMDBResult[]): string[] => {
	return results.map((i) => i.imdbID);
};
