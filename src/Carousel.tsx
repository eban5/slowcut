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
        setPosters(response.data.Search);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<ul className="carousel_content">
			{posters.map((item: any, index: number) => {
				return (<li key={index}>
					<img className="poster" src={item.Poster}></img>
				</li>);
			})}
		</ul>
	);
};
