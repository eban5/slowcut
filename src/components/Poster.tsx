import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

interface MoviePoster {
	idx?: string;
	Title?: string;
	Year?: string;
	Plot?: string;
	Director?: string;
	Writer?: string;
  Poster?: string;
	imdbID?: string;
}
interface PosterProps {
	item: MoviePoster;
}

const renderTooltip = (props: MoviePoster) => {
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

const Poster = (props: PosterProps) => {
	const item: MoviePoster = props.item;
	return (
		<div>
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
		</div>
	);
};

export default Poster;
