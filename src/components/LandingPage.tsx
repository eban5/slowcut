import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, Genre } from '../types/types';

import { Showcase } from './Showcase';
import { CustomCarousel as Carousel } from './Carousel';
import PopularLists from './PopularLists';
import About from './About';

import { Badge, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { buildPosterPath } from '../utils/api';

const LandingPage = () => {
  // TMDB Genres List
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [backdropPoster, setBackdropPoster] = useState<string>('');

  useEffect(() => {
    //get genre list
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then(
        (result) =>
          result.data && result.data.genres && setGenres(result.data.genres)
      );
  }, []);

  useEffect(() => {
    //get trending movies for showcase
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((result) => {
        const votingAverages = result.data.results.map(
          (item: any) => item.vote_average
        );

        const maxRatedIndex = votingAverages.indexOf(
          Math.max(...votingAverages)
        );

        result.data.results && setTrending(result.data.results.slice(0, 6));

        if (votingAverages.length > 0) {
          setBackdropPoster(
            buildPosterPath(result.data.results[maxRatedIndex].backdrop_path)
          );
        }
      });
  }, []);

  return (
    <>
      {/* <div className="background_container"> */}
      <div className="background_wrapper">
        <img style={{ width: '100%' }} src={backdropPoster} />
      </div>
      <div className="App">
        {/* Showcase / Hero */}
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              {' '}
              <div id="showcase">
                <Showcase />
              </div>
            </Col>
          </Row>
        </Container>

        {/* Carousel - Featured Movies */}
        <Container>
          <Row>
            <Col>
              <div id="carousel">
                <h4 className="section_header">Trending This Week</h4>
                <Carousel movies={trending} />
              </div>
            </Col>
          </Row>
        </Container>

        {/* About - Features / Links */}
        <Container>
          <Row>
            <Col>
              <div id="about">
                <h4 className="section_header">About</h4>
                <About />
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              {/* Popular Lists */}
              <div id="popular-lists">
                <h4 className="section_header">Popular Lists</h4>
                <PopularLists />
              </div>
            </Col>
            <Col sm={4}>
              {/* Find By Genre */}
              <div id="discover-genre">
                <h4 className="section_header">Discover by Genre</h4>
                <div>
                  {genres &&
                    genres.map((item) => {
                      const genreGridParams = {
                        pathname: `/genre/${item.id}`,
                        genreID: item.id,
                      };
                      return (
                        <Link to={genreGridParams}>
                          <Badge
                            pill
                            variant="secondary"
                            key={item.id}
                            className="genre_badge"
                          >
                            {item.name}
                          </Badge>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <footer
          style={{
            backgroundColor: 'black',
            color: 'white',
            height: '200px',
            width: '100vw',
            textAlign: 'center',
            marginTop: '50px',
            paddingTop: '25px',
          }}
        >
          Slowcut is just a letterboxd clone.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
