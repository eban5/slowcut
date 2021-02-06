import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Media, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchMovies } from "../hooks/useFetch";

const MovieDetail = ({ match }: any) => {
	const {
		params: { imdbID },
	} = match;

	const [data, setData] = useState<any>(null);
	const searchURL: string = process.env.REACT_APP_OMDB_API_URL || "";
	useEffect(() => {
		axios
			.get(`${searchURL}&i=${imdbID}`)
			.then((movie: any) => {
				console.log(movie);
				movie.data && setData(movie.data);
			})
			.catch((err) => console.error(err));
	}, [imdbID]);

	return (
		<div className="white">
			<Link to="/">Return to Main</Link>
			{data !== null ? (
				<div>
					<Container>
						<Row>
							<Col sm={3}>
								<img
									// width={64}
									// height={64}
									className="mr-3 poster"
									src={data.Poster}
									alt="Movie Poster"
								/>
							</Col>
							<Col sm={9}>
								<h5>
									{data.Title} ({data.Year})
								</h5>
								<strong>{data.Genre}</strong>
								<div>IMDB Rating: {data.imdbRating}</div>
								<div>IMDB Votes: {data.imdbVotes}</div>
								<div>
									<strong>Released: </strong>
									{data.Released}
								</div>
								<div>
									<strong>Produced by: </strong>
									{data.Production}
								</div>
								<div>
									<strong>Director: </strong>
									{data.Director}
								</div>
								<div>
									<strong>Writer(s): </strong>
									{data.Writer}
								</div>
								<div>
									<strong>Actors: </strong>
									{data.Actors}
								</div>
								<p>{data.Plot}</p>
							</Col>
						</Row>
					</Container>
				</div>
			) : (
				<div>No Movie</div>
			)}
		</div>
	);
};

export default MovieDetail;
