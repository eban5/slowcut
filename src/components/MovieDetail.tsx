import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCarousel as Carousel } from "./Carousel";
import "../styles/MovieDetail.css";
import { Genre, WatchProviders } from "../types/types";
import { numberWithCommas } from "../utils/array";
import { buildPosterPath } from "../utils/api";

const MovieDetail = ({ match }: any) => {
	const {
		params: { imdbID },
	} = match;

	const [data, setData] = useState<any>(null);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [similarMovies, setSimilarMovies] = useState<any[]>([]);
	const [watchProviders, setWatchProviders] = useState<WatchProviders>({});

	const movieDetailURL: string = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
	const similarMoviesURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
	const watchProvidersURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

	useEffect(() => {
		axios
			.get(movieDetailURL)
			.then((movie: any) => {
				if (movie.data) {
					setData(movie.data);
					setGenres(movie.data.genres);
				}
			})
			.catch((err) => console.error(err));
		axios
			.get(similarMoviesURL)
			.then((movies: any) => {
				if (movies.data) {
					setSimilarMovies(movies.data.results);
				}
			})
			.catch((err) => console.error(err));
		axios
			.get(watchProvidersURL)
			.then((results) => {
				if (results.data.results) {
					setWatchProviders(results.data.results.US);
				}
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="white">
			<Container>
				<Row>
					<Col sm={12}>
						<Link to="/">
							<span className="breadcrumb">Return to Main</span>
						</Link>
					</Col>
				</Row>
			</Container>
			{data !== null ? (
				<>
					<div>
						<Container>
							<Row>
								<Col sm={3}>
									<img
										// width={64}
										// height={64}
										className="mr-3 poster"
										src={buildPosterPath(data.poster_path)}
										alt="Movie Poster"
									/>
								</Col>
								<Col sm={9}>
									<h5>
										{data.title} ({data.release_date.substr(0, 4)})
									</h5>
									<strong>{genres.map((genre: Genre) => genre.name)}</strong>
									<div>
										IMDB Rating: {data.vote_average} / 10 (
										{numberWithCommas(data.vote_count)} votes)
									</div>

									<div>
										<strong>Release Date: </strong>
										{data.release_date}
									</div>
									<div>
										<strong>Produced by: </strong>
										{data.production_companies.map(
											(company: any) => company.name + ",  "
										)}
									</div>
									{/* <div>
										<strong>Director: </strong>
										{data.Director}
									</div>
									<div>
										<strong>Writer(s): </strong>
										{data.Writer}
									</div> */}
									{/* <div>
										<strong>Actors: </strong>
										{data.Actors}
									</div> */}
									<p>{data.overview}</p>
									<div className="just_watch">
										Rent:
										<ul>
											{watchProviders &&
												watchProviders.rent &&
												watchProviders.rent.map((provider: any) => {
													console.log(provider);
													return <li>{provider.provider_name}</li>;
												})}
										</ul>
										Buy:
										<ul>
											{watchProviders &&
												watchProviders.buy &&
												watchProviders.buy.map((provider: any) => {
													return <li>{provider.provider_name}</li>;
												})}
										</ul>
										PPV:
										<ul>
											{watchProviders &&
												watchProviders.flatrate &&
												watchProviders.flatrate.map((provider: any) => {
													return <li>{provider.provider_name}</li>;
												})}
										</ul>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
					<div>
						<Container>
							<Row>
								<Col sm={12}>
									<h4 className="section_header">Related Movies</h4>
									<Carousel movies={similarMovies} />
								</Col>
							</Row>
						</Container>
					</div>
				</>
			) : (
				<div>No Movie</div>
			)}
			<div className="meta">Watch provider data provided by JustWatch.</div>
		</div>
	);
};

export default MovieDetail;
