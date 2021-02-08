export interface OMDBResult {
	Poster: string;
	Title: string;
	Type: "movie" | "series" | "episode";
	Year: string;
	imdbID: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface Movie {
	imdbID: string;
	title: string;
	year: string;
	poster: string;
}