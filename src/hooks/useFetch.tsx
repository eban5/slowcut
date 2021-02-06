import React, { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch data from the movie data API
export const useFetchIds = (query: string) => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!query) return;

		const fetchData = async () => {
			const searchURL = process.env.REACT_APP_OMDB_API_URL || "";
			setStatus("fetching");

			axios.get(`${searchURL}&s=${query}`).then((response) => {
				console.log(response)
				if (response.data.Search) {
					setData(response.data.Search.slice(0, 6));
				}
			});
			setStatus("fetched");
		};

		fetchData();
	}, [query]);

	return { status, data };
};
