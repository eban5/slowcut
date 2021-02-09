import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { buildPosterPath } from "../utils/api";

interface MoviePoster {
	idx?: string;
	id?: string;
	title?: string;
	release_date?: string;
	poster_path?: string;
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
			{props && props.title} ({props && props.release_date && props.release_date.substr(0, 4)}
			)
		</Tooltip>
	);
};

const Poster = (props: PosterProps) => {
	const item: MoviePoster = props.item;
	return (
		<>
			<OverlayTrigger
				placement="auto"
				delay={{ show: 100, hide: 100 }}
				overlay={renderTooltip(item)}>
				<Link to={`/movie/${item.id}`}>
					<img
						className="poster"
						alt={`${item.title} (${item.release_date?.substr(0, 4)})`}
						src={buildPosterPath(`${item.poster_path}`)}
					/>
				</Link>
			</OverlayTrigger>
		</>
	);
};

export default Poster;
