import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, Genre, Certifications } from '../types/types';

import '../styles/App.css';
import { Showcase } from './Showcase';
import { CustomCarousel as Carousel } from './Carousel';
import PopularLists from './PopularLists';
import About from './About';

import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

import { buildPosterPath } from '../utils/api';
import GenreBadge from './Genre';
import { mpaCertifications } from '../data/lists';

const LandingPage = () => {
  // TMDB Genres List
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [backdropPoster, setBackdropPoster] = useState<string>('');

  const certifications: Certifications[] = mpaCertifications();

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        // Set the backdrop of the landing page to the backdrop image
        // of the highest rated movie in "Trending This Week" collection
        const votingAverages = result.data.results.map(
          (item: any) => item.vote_average
        );

        const maxRatedIndex = votingAverages.indexOf(
          Math.max(...votingAverages)
        );

        result.data.results && setTrending(result.data.results.slice(0, 6));

        if (votingAverages.length > 0) {
          setBackdropPoster(
            buildPosterPath(
              result.data.results[maxRatedIndex].backdrop_path,
              `original`
            )
          );
        }
      });
  }, []);

  return (
    <>
      <div className="background_wrapper">
        <img
          style={{ width: '100%' }}
          alt="Slowcut backdrop"
          src={backdropPoster}
        />
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
                    genres.map((item) => (
                      <GenreBadge genreID={item.id} genreName={item.name} />
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <footer className="slowcut_footer">
          Slowcut is just a{' '}
          <a
            href="https://letterboxd.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Letterboxd clone
          </a>
          .<br /> All data is provided by{' '}
          <a
            href="https://developers.themoviedb.org/3/"
            target="_blank"
            rel="noreferrer noopener"
          >
            The Movie Database (TMDb) API
          </a>
          .<br /> Watch Provider data provided by{' '}
          <a
            href="https://www.justwatch.com/us"
            target="_blank"
            rel="noreferrer noopener"
          >
            Just Watch
          </a>
          .
          <br />
          <Button
            className="mpa_learn_more"
            style={{
              cursor: 'pointer',
              backgroundColor: 'transparent',
              textDecoration: 'underline',
              outline: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
            }}
            onClick={handleShow}
          >
            Learn more about the Motion Picture Association film rating system.
          </Button>
          <Modal
            size="lg"
            className="mpa_ratings_modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
          >
            <Modal.Header className="mpa_modal_heading" closeButton>
              <Modal.Title as="h3" id="contained-modal-title-vcenter">
                Motion Picture Association Film Rating System
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: '32px' }}>
                <Row style={{ alignItems: 'middle' }}>
                  {certifications &&
                    certifications.map((cert: Certifications) => {
                      return (
                        <>
                          <Col
                            sm={3}
                            style={{
                              borderTop: '0.5px solid #789',
                              marginTop: '16px',
                            }}
                          >
                            <h2 style={{ textAlign: 'center' }}>
                              {cert.certification}
                            </h2>
                          </Col>
                          <Col
                            sm={9}
                            style={{
                              borderTop: '0.5px solid #789',
                              marginTop: '16px',
                            }}
                          >
                            <p style={{ textAlign: 'justify' }}>
                              {cert.meaning}
                            </p>
                          </Col>
                        </>
                      );
                    })}
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
