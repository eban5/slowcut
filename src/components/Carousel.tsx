import React from "react";
import "../styles/Carousel.css";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useFetchMovies } from "../hooks/useFetch";
import { Link } from "react-router-dom";

// TODO: change OverlayTrigger to be StrictMode compliant. See: https://react-bootstrap.netlify.app/components/overlays/

interface PosterProps {
	Title?: string;
	Year?: string;
	Plot?: string;
	Director?: string;
	Writer?: string;
	imdbID?: string;
}

interface CarouselTooltipProps {
	idx?: string;
	Title: string;
	Year: string;
}

const renderTooltip = (props: CarouselTooltipProps) => {
	return (
		<Tooltip
			className="carousel_tooltip"
			key={props.idx}
			id={`button-tooltip-${props.idx}`}
			{...props}>
			{props.Title} ({props.Year})
		</Tooltip>
	);
};

export const CustomCarousel = () => {
	const { status, data } = useFetchMovies("star wars");

	return (
		<>
			{status === "fetching" ? (
				<div>Loading...</div>
			) : (
				<ul className="carousel_content">
					{data.map((item: any, index: number) => {
						return (
							// link to the movie details page for onClick
							<li key={index}>
								<OverlayTrigger
									placement="top"
									delay={{ show: 100, hide: 400 }}
									overlay={renderTooltip(item)}>
									<Link to={`/movie/${item.imdbID}`}>
										<img
											className="poster"
											alt={`${item.Title} (${item.Year})`}
											src={item.Poster}
										/>
									</Link>
								</OverlayTrigger>
							</li>
						);
					})}
				</ul>
			)}
		</>									
	);
};
