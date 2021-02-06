import React, { useEffect, useState } from "react";
import "./Carousel.css";
import axios from "axios";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { render } from "@testing-library/react";

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

interface OMDBResult {
	Poster: string;
	Title: string;
	Type: "movie" | "series" | "episode";
	Year: string;
	imdbID: string;
}

const popover = (props: PosterProps) => {
	return (
		<Popover key={props.imdbID} id="popover-basic">
			<Popover.Title>
				<strong>
					{props.Title} ({props.Year})
				</strong>
			</Popover.Title>
			<Popover.Content>
				<p>Directed by: {props.Director}</p>
				<p>Written by: {props.Writer}</p>

				<p>{props.Plot}</p>
			</Popover.Content>
		</Popover>
	);
};

const renderTooltip = (props: CarouselTooltipProps) => {
	return (
		<Tooltip className="carousel_tooltip" key={props.idx} id={`button-tooltip-${props.idx}`} {...props}>
			{props.Title} ({props.Year})
		</Tooltip>
	);
};

export const CustomCarousel = () => {
	const OMDB_API_KEY: string = process.env.REACT_APP_OMDB_API_KEY || "";
	const testURL: any = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=batman`;

	// TODO: create a proper fallback list item and remove this dummy item
	const dummyMovie = {
		Title: "Movie Title",
		Year: "2021",
		Poster: "https://picsum.photos/200/300",
	};

	const [posters, setPosters] = useState<any>([]);
	const [movies, setMovies] = useState<any>([]);

	const getMovieIds = (results: OMDBResult[]): string[] => {
		return results.map((i) => i.imdbID);
	};

	useEffect(() => {
		/* The OMDB API offers searches by either title or ID. The title results are very limited but at least provide an imdbID for each title in the results. To get around this, we need to make two API requests: 1. get titles that match our title search query and then create a list of those imdbIDs 2. then, call the endpoint that accepts imdbIDs as input and request one by one. */
		axios
			.get(testURL)
			.then((response) => {
				if (response.data.Search) {
					return getMovieIds(response.data.Search.slice(0, 6));
				} else {
					setPosters([
						dummyMovie,
						dummyMovie,
						dummyMovie,
						dummyMovie,
						dummyMovie,
						dummyMovie,
					]);
				}
			})
			.then((response) => {
				response &&
					response.forEach((element: string) => {
						axios
							.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${element}`)
							.then((item: any) => {
								setMovies((oldMovies: any[]) => [...oldMovies, item.data]);
							})
							.catch((err) => console.error(err));
					});
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<ul className="carousel_content">
			{movies.map((item: any, index: number) => {
				return (
					// link to the movie details page for onClick
					<li key={index}>
						<OverlayTrigger
							placement="top"
							delay={{ show: 100, hide: 400 }}
							overlay={renderTooltip(item)}>
							<img
								className="poster"
								alt={`${item.Title} (${item.Year})`}
								src={item.Poster}
							/>
						</OverlayTrigger>
					</li>

					// <OverlayTrigger
					// trigger={["focus", "hover"]}
					// key={index}
					// placement="auto"
					// overlay={popover(item)}>

					// </OverlayTrigger>
				);
			})}
		</ul>
	);
};
