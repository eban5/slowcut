import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import nextArrow from '../images/next-arrow.png';
import previousArrow from '../images/previous-arrow.png';
import {
  Badge,
  Button,
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
import '../styles/App.css';
import { Genre, WatchProviders } from '../types/types';
import { numberWithCommas, parseCrewMembers } from '../utils/array';
import {
  buildPosterPath,
  buildRequest,
  filterWatchProviders,
} from '../utils/api';
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

  const movieDetailURL: string = buildRequest('movie-detail', imdbID);
  const recommendedMoviesURL: string = buildRequest(
    'recommended-movies',
    imdbID
  );
  const watchProvidersURL: string = buildRequest('watch-providers', imdbID);
  const movieCreditsURL: string = buildRequest('movie-credits', imdbID);
  const videosURL: string = buildRequest('movie-videos', imdbID);

  useEffect(() => {
    const movieDetailRequest = axios.get(movieDetailURL);
    const recommendedMoviesRequest = axios.get(recommendedMoviesURL);
    const watchProvidersRequest = axios.get(watchProvidersURL);
    const movieCreditsRequest = axios.get(movieCreditsURL);
    const videosRequest = axios.get(videosURL);

    axios
      .all([
        movieDetailRequest,
        recommendedMoviesRequest,
        watchProvidersRequest,
        movieCreditsRequest,
        videosRequest,
      ])
      .then(
        axios.spread((...responses) => {
          const movieDetailResponse = responses[0];
          const recommendedMoviesResponse = responses[1];
          const watchProvidersResponse = responses[2];
          const movieCreditsResponse = responses[3];
          const videosResponse = responses[4];

          // Set Movie Details
          if (movieDetailResponse.data) {
            setData(movieDetailResponse.data);
            setGenres(movieDetailResponse.data.genres);
          }
          if (recommendedMoviesResponse.data) {
            setRecommendedMovies(recommendedMoviesResponse.data.results);
          }
          if (watchProvidersResponse.data) {
            // We only return a subset of the watch providers
            const filteredWatchProviders = filterWatchProviders(
              watchProvidersResponse.data.results.US
            );
            setWatchProviders(filteredWatchProviders);
          }
          if (movieCreditsResponse.data) {
            // group and order the crew results
            const crew = parseCrewMembers(
              movieCreditsResponse.data.crew.slice(0, 15)
            );

            setCrew(crew);
            setCast(movieCreditsResponse.data.cast.slice(0, 15));
          }
          if (videosResponse.data) {
            setVideos(videosResponse.data.results);
          }
        })
      )
      .catch((errors) => {
        const movieDetailError = errors[0];
        console.error(movieDetailError);
        const recommendedMoviesError = errors[1];
        console.error(recommendedMoviesError);
        const watchProvidersError = errors[2];
        console.error(watchProvidersError);
        const movieCreditsError = errors[3];
        console.error(movieCreditsError);
        const videosError = errors[4];
        console.error(videosError);
      });
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
              alt=""
            />
          </div>

          <Container style={{ paddingTop: '400px' }}>
            <Row>
              <Col sm={3}>
                <img
                  className="mr-3 movie_detail_poster"
                  src={buildPosterPath(data.poster_path, `w500`)}
                  alt=""
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
                          <Button
                            className=""
                            style={{
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              border: 'none',
                              textDecoration: 'underline',
                            }}
                            onClick={handleShow}
                          >
                            {video.name}
                          </Button>
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
                                      title={`${video.key}`}
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
                    return <div></div>;
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

                    <Tab
                      eventKey="crew"
                      title="Crew"
                      style={{ marginBottom: '16px' }}
                    >
                      {crew &&
                        crew.map((item: any) => {
                          return (
                            <Row>
                              <Col sm={4} className="center">
                                <h5 className="details_headers">{item.job}</h5>
                              </Col>

                              <Col className="center">
                                <Link to={`/director/${item.id}`}>
                                  <Badge className="movie_detail_cast_badge">
                                    {item.original_name}
                                  </Badge>
                                </Link>
                              </Col>
                            </Row>
                          );
                        })}
                    </Tab>
                    <Tab eventKey="details" title="Details">
                      <Row style={{ marginTop: '16px' }}>
                        <Col sm={2} className="center">
                          <h5 className="details_headers">Studios</h5>
                        </Col>

                        <Col className="center">
                          {data.production_companies.map((company: any) => (
                            <Badge className="movie_detail_cast_badge">
                              {company.name}
                            </Badge>
                          ))}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4} className="center">
                          <h5 className="details_headers">Runtime</h5>
                        </Col>

                        <Col className="center">{data.runtime} mins</Col>
                      </Row>

                      <Row>
                        <Col sm={4} className="center">
                          <h5 className="details_headers">Release Date</h5>
                        </Col>

                        <Col className="center">{data.release_date}</Col>
                      </Row>
                      <Row>
                        <Col sm={4} className="center">
                          <h5 className="details_headers">IMDB Rating</h5>
                        </Col>

                        <Col className="center">
                          {data.vote_average} / 10 (
                          {numberWithCommas(data.vote_count)} votes)
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          More details at{' '}
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
                        </Col>
                      </Row>
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
                    <Button className="pagination-button">
                      <img src={previousArrow} height={30} alt="previous" />
                    </Button>
                  </Col>
                  <Col sm={10}>{/* empty space */}</Col>
                  <Col>
                    <Button className="pagination-button">
                      <img src={nextArrow} height={30} alt="next" />
                    </Button>
                  </Col>
                </Pagination>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div className="not_found">Loading...</div>
      )}
    </div>
  );
};

export default withRouter(MovieDetail);
