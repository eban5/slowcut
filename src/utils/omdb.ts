import { OMDBResult } from "../types/types";
export const getMovieIds = (results: OMDBResult[]): string[] => {
	return results.map((i) => i.imdbID);
};
