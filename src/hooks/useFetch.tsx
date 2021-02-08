import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch data from the movie data API
export const useFetchPopularMovies = () => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		const fetchData = async () => {
			setStatus("fetching");

			axios
				.get(
					`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
				)
				.then((response) => {
					if (response.data) {
						let subset: any[] = [];
						for (let x = 0; x < 6; x++) {
							subset.push(
								response.data.results[
									Math.floor(Math.random() * response.data.results.length)
								]
							);
						}
						setData(subset);
					}
				})
				.catch((error) => console.error(error));

			setStatus("fetched");
		};

		fetchData();
	}, []);

	return { status, data };
};

export const useFetchMovies = (query: string) => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		if (!query) return;

		const fetchData = async () => {
			setStatus("fetching");

			axios
				.get(
					`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
				)
				.then((response) => {
					response.data && setData(response.data.results);
				})
				.catch((error) => console.error(error));

			setStatus("fetched");
		};

		fetchData();
	}, [query]);

	return { status, data };
};
