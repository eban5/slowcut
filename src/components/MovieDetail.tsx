import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import {
  Badge,
  Col,
  Container,
  Media,
  OverlayTrigger,
  Popover,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { CustomCarousel as Carousel } from './Carousel';
import '../styles/MovieDetail.css';
import { Genre, WatchProviders } from '../types/types';
import { numberWithCommas } from '../utils/array';
import { buildPosterPath, filterWatchProviders } from '../utils/api';

interface CastPopupProps {
  character?: string;
  original_name?: string;
  profile_path?: string;
}

const castPopover = (props: CastPopupProps) => {
  const image = props.profile_path || '';
  return (
    <Popover id="popover-basic" className="movie_detail_cast_popover">
      <Popover.Title className="movie_detail_cast_popover" as="h3">
        {props.original_name}
      </Popover.Title>
      <Popover.Content>
        <Media>
          <img
            width={64}
            className="mr-3 cast_profile_photo"
            src={buildPosterPath(image)}
            alt=""
          />
          <Media.Body>
            <p style={{ color: '#fff' }}>{props.character}</p>
          </Media.Body>
        </Media>
      </Popover.Content>
    </Popover>
  );
};
const MovieDetail = ({ match }: any) => {
  const {
    params: { imdbID },
  } = match;

  const [data, setData] = useState<any>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [watchProviders, setWatchProviders] = useState<WatchProviders>({});
  const [crew, setCrew] = useState<any>([]);
  const [cast, setCast] = useState<any>([]);

  const movieDetailURL: string = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const recommendedMoviesURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const watchProvidersURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const movieCredits: string = `https://api.themoviedb.org/3/movie/${imdbID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

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
          // We are only returning Apple, Google/YT, and Amazon results
          const filteredWatchProviders = filterWatchProviders(
            results.data.results.US
          );
          setWatchProviders(filteredWatchProviders);
        }
      })
      .catch((err) => console.error(err));
  }, [match]);
  useEffect(() => {
    axios
      .get(movieCredits)
      .then((results) => {
        if (results.data) {
          setCrew(results.data.crew);
          setCast(results.data.cast);
        }
      })
      .catch((err) => console.error(err));
  }, [match]);

  return (
    <div className="white">
      {data !== null ? (
        <>
          <div className="movie_detail_backdrop_wrapper">
						<img style={{ width: "100%" }} src={buildPosterPath(data.backdrop_path)} />
					</div>

          <Container style={{ paddingTop: '400px' }}>
            <Row>
              <Col sm={3}>
                <img
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
                    <Tab eventKey="cast" title="Cast">
                      {cast &&
                        cast.slice(0, 10).map((item: any) => {
                          return (
                            <OverlayTrigger
                              trigger="hover"
                              placement="auto"
                              overlay={castPopover(item)}
                            >
                              <Badge
                                pill
                                variant="secondary"
                                style={{ cursor: 'pointer' }}
                              >
                                {item.original_name}
                              </Badge>
                            </OverlayTrigger>
                          );
                        })}
                    </Tab>

                    <Tab eventKey="crew" title="Crew">
                      {crew &&
                        crew.slice(0, 10).map((item: any) => {
                          return (
                            <div>
                              {item.job}: {item.original_name}
                            </div>
                          );
                        })}
                    </Tab>
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
