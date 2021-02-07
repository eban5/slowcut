import { useState, useEffect } from "react";
import axios from "axios";
import { getMovieIds } from "../utils/omdb";

const searchURL: string = process.env.REACT_APP_OMDB_API_URL || "";

/* The OMDB API offers searches by either title or ID. The title results are very limited but at least provide an imdbID for each title in the results. To get around this, we need to make two API requests: 1. get titles that match our title search query and then create a list of those imdbIDs 2. then, call the endpoint that accepts imdbIDs as input and request one by one. */

// Custom hook to fetch data from the movie data API
export const useFetchMovies = (query: string) => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		if (!query) return;

		const fetchData = async () => {
			setStatus("fetching");

			axios
				.get(`${searchURL}&s=${query}&type=movie`)
				.then((response) => {
					if (response.data.Search) {
						return getMovieIds(response.data.Search.slice(0, 6));
					}
				})
				.then((response) => {
					response &&
						response.forEach((element: string) => {
							axios
								.get(`${searchURL}&i=${element}`)
								.then((item: any) => {
									item.data &&
										setData((oldCards: string[]) => [...oldCards, item.data]);
								})
								.catch((err) => console.error(err));
						});
				});
			setStatus("fetched");
		};

		fetchData();
	}, [query]);

	return { status, data };
};
