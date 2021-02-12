import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch data from the movie data API
export const useFetchPopularMovies = (props: any) => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState<any>([]);

	const { num } = props;

	useEffect(() => {
		const fetchData = async () => {
			setStatus("fetching");

			axios
				.get(
					`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
				)
				.then((response) => {
					if (response.data) {
						if (num > 0) {
							// TODO temp random movies for lists until we have a DB
							let subset: any[] = [];
							for (let x = 0; x < num; x++) {
								subset.push(
									response.data.results[
										Math.floor(Math.random() * response.data.results.length)
									]
								);
							}
							setData(subset);
						} else {
							// no number of results specified, just return all of them
							setData(response.data.results);
						}
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

export const useFetchGenre = (genreID: string) => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		if (!genreID) return;

		const fetchData = async () => {
			setStatus("fetching");

			axios
				.get(
					`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&with_genres=${genreID}`
				)
				.then((response) => {
					console.log(response)
					response.data && setData(response.data.results);
				})
				.catch((error) => console.error(error));

			setStatus("fetched");
		};

		fetchData();
	}, [genreID]);

	return { status, data };
};

export const useFetchSearch = () => {};
const resources: any = {};
const makeRequestCreator = () => {
	let cancel: any;

	return async (query: string) => {
		// check that a request was made
		if (cancel) {
			//cancel previous request before making a new request
			cancel.cancel();
		}

		cancel = axios.CancelToken.source();

		try {
			if (resources[query]) {
				//return result if it exists
				return resources[query];
			}

			const res = await axios(query, { cancelToken: cancel.token });
			const result = res.data.results;

			//store the response so we don't make too many requests we don't have to
			resources[query] = result;

			return result;
		} catch (error) {
			if (axios.isCancel(error)) {
				//handle if request was cancelled
				console.log("Request cancelled", error.message);
			} else {
				// handle typical errors
				console.log("Something went wrong: ", error.message);
			}
		}
	};
};

export const search = makeRequestCreator();
