import React, { useEffect, useState } from "react";
import "./Carousel.css";
import axios from "axios";

export const CustomCarousel = () => {
	const OMDB_API_KEY: string = process.env.REACT_APP_OMDB_API_KEY || "";

	const [posters, setPosters] = useState<any>([]);

	useEffect(() => {
		const testURL: any = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=batman`;

		axios
			.get(testURL)
			.then((response) => {
				setPosters(response.data.Search.slice(0, 6));
			})
			.catch((error) => console.error(error));
	}, [OMDB_API_KEY]);

	return (
		<ul className="carousel_content">
			{posters.map((item: any, index: number) => {
				return (
					<li key={index}>
						<img
							className="poster"
							alt={`${item.Title} (${item.Year})`}
							src={item.Poster}></img>
					</li>
				);
			})}
		</ul>
	);
};
