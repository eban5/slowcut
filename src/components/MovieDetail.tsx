import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import {
  Badge,
  Col,
  Container,
  Media,
  Modal,
  OverlayTrigger,
  Pagination,
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
import { Link } from 'react-router-dom';

interface CastPopupProps {
  character?: string;
  original_name?: string;
  profile_path?: string;
}

const WatchProviderLogo = (props: any) => {
  const { provider } = props;
  return (
    <li>
      <img
        width={40}
        height={40}
        style={{ margin: '4px 0' }}
        src={buildPosterPath(provider.logo_path, `w185`)}
        alt={`${provider.provider_name}`}
      />
    </li>
  );
};

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
            src={buildPosterPath(image, `w780`)}
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
  const [videos, setVideos] = useState<any>([]);
  const [crew, setCrew] = useState<any>([]);
  const [cast, setCast] = useState<any>([]);

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const movieDetailURL: string = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const recommendedMoviesURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const watchProvidersURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const movieCredits: string = `https://api.themoviedb.org/3/movie/${imdbID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const videosURL: string = `https://api.themoviedb.org/3/movie/${imdbID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

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
      .get(videosURL)
      .then((videoResult: any) => {
        if (videoResult.data) {
          setVideos(videoResult.data.results);
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
          setCrew(results.data.crew.slice(0, 15));
          setCast(results.data.cast.slice(0, 15));
        }
      })
      .catch((err) => console.error(err));
  }, [match]);

  // TODO - break into smaller components for each tab

  return (
    <div className="white">
      {data !== null ? (
        <>
          <div className="movie_detail_backdrop_wrapper">
            <img
              style={{ width: '100%' }}
              src={buildPosterPath(data.backdrop_path, `original`)}
            />
          </div>

          <Container style={{ paddingTop: '400px' }}>
            <Row>
              <Col sm={3}>
                <img
                  className="mr-3 movie_detail_poster"
                  src={buildPosterPath(data.poster_path, `w500`)}
                  alt="Movie Poster"
                />
              </Col>
              <Col sm={9}>
                <h5 className="movie_detail_title">
                  {data.title} ({data.release_date.substr(0, 4)})
                </h5>

                <p>
                  <span className="movie_detail_tagline">{data.tagline}</span>
                </p>

                <p className="movie_detail_overview">{data.overview}</p>

                <p className="movie_detail_trailers">
                  {videos.map((video: any) => {
                    if (
                      ['Trailer', 'Teaser', 'trailer', 'teaser'].includes(
                        video.type
                      )
                    ) {
                      return (
                        <div>
                          {' '}
                          <a
                            className=""
                            style={{ cursor: 'pointer' }}
                            onClick={handleShow}
                          >
                            {video.name}
                          </a>
                          <Modal
                            size="lg"
                            className="mpa_ratings_modal"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={show}
                            onHide={handleClose}
                          >
                            <Modal.Header
                              className="mpa_modal_heading"
                              closeButton
                            >
                              <Modal.Title
                                as="h3"
                                id="contained-modal-title-vcenter"
                              >
                                {video.name}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Container style={{ marginTop: '32px' }}>
                                <Row style={{ alignItems: 'middle' }}>
                                  <Col>
                                    <iframe
                                      width="720"
                                      height="405"
                                      src={`https://www.youtube.com/embed/${video.key}`}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                  </Col>
                                </Row>
                              </Container>
                            </Modal.Body>
                          </Modal>
                        </div>
                      );
                    }
                  })}
                </p>

                <div className="tabs">
                  <Tabs defaultActiveKey="cast" id="uncontrolled-tab-example">
                    <Tab eventKey="watch" title="Watch">
                      <div className="just_watch">
                        <Row>
                          <Col>
                            {watchProviders && watchProviders.rent ? (
                              <h6 className="movie_detail_watch_provider">
                                Rent
                              </h6>
                            ) : (
                              ''
                            )}
                            <ul>
                              {watchProviders &&
                                watchProviders.rent &&
                                watchProviders.rent.map((provider: any) => (
                                  <WatchProviderLogo provider={provider} />
                                ))}
                            </ul>
                          </Col>
                          <Col>
                            {watchProviders && watchProviders.buy ? 'Buy' : ''}
                            <ul>
                              {watchProviders &&
                                watchProviders.buy &&
                                watchProviders.buy.map((provider: any) => (
                                  <WatchProviderLogo provider={provider} />
                                ))}
                            </ul>
                          </Col>
                          <Col>
                            {watchProviders && watchProviders.flatrate
                              ? 'PPV'
                              : ''}
                            <ul>
                              {watchProviders &&
                                watchProviders.flatrate &&
                                watchProviders.flatrate.map((provider: any) => (
                                  <WatchProviderLogo provider={provider} />
                                ))}
                            </ul>
                          </Col>
                        </Row>
                      </div>
                      <div className="movie_detail_just_watch_credit">
                        Data provided by{' '}
                        <a href={`${watchProviders.link}`}>JustWatch</a>.
                      </div>
                    </Tab>
                    <Tab eventKey="cast" title="Cast">
                      <div className="movie_detail_cast">
                        {cast &&
                          cast.map((item: any) => {
                            return (
                              <OverlayTrigger
                                trigger="hover"
                                placement="auto"
                                overlay={castPopover(item)}
                              >
                                <Link to={`/actor/${item.id}`}>
                                  <Badge
                                    variant="secondary"
                                    className="movie_detail_cast_badge"
                                  >
                                    {item.original_name}
                                  </Badge>
                                </Link>
                              </OverlayTrigger>
                            );
                          })}
                      </div>
                    </Tab>

                    <Tab eventKey="crew" title="Crew">
                      {crew &&
                        crew.map((item: any) => {
                          return (
                            <div>
                              {item.job}: {item.original_name}
                            </div>
                          );
                        })}
                    </Tab>
                    <Tab eventKey="details" title="Details">
                      <div>
                        <strong>{data.runtime} mins</strong>. More details at{' '}
                        <a
                          href={`http://www.imdb.com/title/${data.imdb_id}/maindetails`}
                        >
                          <Badge className="movie_detail_cast_badge">
                            IMDB
                          </Badge>
                        </a>{' '}
                        <a
                          href={`https://www.themoviedb.org/movie/${data.id}/`}
                        >
                          <Badge className="movie_detail_cast_badge">
                            TMDB
                          </Badge>
                        </a>
                      </div>
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
                            <Badge
                              className="movie_detail_genre_badge"
                              variant="secondary"
                            >
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
            <Row>
              <Col sm={12}>
                <Pagination>
                  <Col>
                    <Pagination.Prev disabled>Previous</Pagination.Prev>
                  </Col>
                  <Col sm={10}>{/* empty space */}</Col>
                  <Col>
                    <Pagination.Next>Next</Pagination.Next>
                  </Col>
                </Pagination>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>No Movie</div>
      )}
    </div>
  );
};

export default withRouter(MovieDetail);
