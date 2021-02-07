import React from "react";
import "../styles/Carousel.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useFetchMovies } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Poster from "./Poster";

// TODO: change OverlayTrigger to be StrictMode compliant. See: https://react-bootstrap.netlify.app/components/overlays/

interface CarouselProps {
	keyword: string;
}

export const CustomCarousel = (props: CarouselProps) => {
	const { keyword } = props;
	const { status, data } = useFetchMovies(keyword);
	// TODO move this reverse sort to the utils dir
	// Sort reverse chronological
	const sortedMovies = data.sort((a: any, b: any) => (a.Year < b.Year ? 1 : -1));

	return (
		<>
			{status === "fetching" ? (
				<div className="white">Loading...</div>
			) : (
				<ul className="carousel_content">
					{sortedMovies.map((item: any, index: number) => {
						return (
							// link to the movie details page for onClick
							<li className="poster" key={index}>
								<Poster key={index} item={item} />
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};
