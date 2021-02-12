import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Badge, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomCarousel as Carousel } from './Carousel';
import '../styles/MovieDetail.css';
import { Genre, WatchProviders } from '../types/types';
import { numberWithCommas } from '../utils/array';
import { buildPosterPath } from '../utils/api';

const MovieDetail = ({ match }: any) => {
  const {
    params: { imdbID },
  } = match;

  const [data, setData] = useState<any>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [watchProviders, setWatchProviders] = useState<WatchProviders>({});

  const movieDetailURL: string = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const recommendedMoviesURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
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
  }, [match]);
  useEffect(() => {
    axios
      .get(recommendedMoviesURL)
      .then((movies: any) => {
        if (movies.data) {
          setRecommendedMovies(movies.data.results);
        }
      })
      .catch((err) => console.error(err));
  }, [match]);
  useEffect(() => {
    axios
      .get(watchProvidersURL)
      .then((results) => {
        if (results.data.results) {
          setWatchProviders(results.data.results.US);
        }
      })
      .catch((err) => console.error(err));
  }, [match]);

  return (
    <div className="white">
      {data !== null ? (
        <>
          {/* <div className="movie_detail_backdrop_wrapper">
						<img style={{ width: "100%" }} src={buildPosterPath(data.backdrop_path)} />
					</div> */}

          <Container style={{ paddingTop: '400px' }}>
            <Row>
              <Col sm={3}>
                <img
                  // width={64}
                  // height={64}
                  className="mr-3 movie_detail_poster"
                  src={buildPosterPath(data.poster_path)}
                  alt="Movie Poster"
                />
              </Col>
              <Col sm={9}>
                <h5 className="movie_detail_title">
                  {data.title} ({data.release_date.substr(0, 4)})
                </h5>

                <p style={{ paddingTop: '25px' }}>{data.overview}</p>

                <div className="tabs">
                  <Tabs defaultActiveKey="cast" id="uncontrolled-tab-example">
                    <Tab eventKey="watch" title="Watch">
                      <div className="just_watch">
                        <Row>
                          <Col>
                            {watchProviders && watchProviders.rent ? (
                              <h6>Rent</h6>
                            ) : (
                              ''
                            )}
                            <ul>
                              {watchProviders &&
                                watchProviders.rent &&
                                watchProviders.rent.map((provider: any) => {
                                  console.log(provider);
                                  return <li>{provider.provider_name}</li>;
                                })}
                            </ul>
                          </Col>
                          <Col>
                            {watchProviders && watchProviders.buy ? 'Buy' : ''}
                            <ul>
                              {watchProviders &&
                                watchProviders.buy &&
                                watchProviders.buy.map((provider: any) => {
                                  return <li>{provider.provider_name}</li>;
                                })}
                            </ul>
                          </Col>
                          <Col>
                            {watchProviders && watchProviders.flatrate
                              ? 'PPV'
                              : ''}
                            <ul>
                              {watchProviders &&
                                watchProviders.flatrate &&
                                watchProviders.flatrate.map((provider: any) => {
                                  return <li>{provider.provider_name}</li>;
                                })}
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="cast" title="Cast"></Tab>
                    <Tab eventKey="crew" title="Crew"></Tab>
                    <Tab eventKey="details" title="Details">
                      <div>
                        <strong>Release Date: </strong>
                        {data.release_date}
                      </div>
                      <div>
                        <strong>Produced by: </strong>
                        {data.production_companies
                          .map((company: any) => company.name)
                          .join(', ')}
                      </div>
                      <div>
                        IMDB Rating: {data.vote_average} / 10 (
                        {numberWithCommas(data.vote_count)} votes)
                      </div>
                    </Tab>
                    <Tab eventKey="genres" title="Genres">
                      <div className="movie_detail_genres">
                        {genres.map((genre: Genre) => {
                          return (
                            <Badge pill variant="secondary">
                              {genre.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col sm={12}>
                <h4 className="section_header">Recommended Movies</h4>
                <Carousel movies={recommendedMovies} />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>No Movie</div>
      )}
      <div className="meta">Watch provider data provided by JustWatch.</div>
    </div>
  );
};

export default withRouter(MovieDetail);
