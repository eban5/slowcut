import React from "react";

const MovieDetail = ({ match }: any) => {
	const {
		params: { imdbID },
	} = match;

	return (
		<div>
			Movie details page: <strong>{imdbID}</strong>
		</div>
	);
};

export default MovieDetail;
