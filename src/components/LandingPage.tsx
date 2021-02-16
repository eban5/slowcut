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
  const [modalShow, setModalShow] = useState<boolean>(false);

  const certifications: Certifications[] = mpaCertifications();

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

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
            buildPosterPath(result.data.results[maxRatedIndex].backdrop_path)
          );
        }
      });
  }, []);

  return (
    <>
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
                    genres.map((item) => (
                      <GenreBadge genreID={item.id} genreName={item.name} />
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container style={{marginTop: "32px"}}>
          <Row>
            {certifications &&
              certifications.map((cert: Certifications) => {
                return (
                  <>
                    <Col sm={2}>
                      <h2 style={{textAlign: "center"}}>{cert.certification}</h2>
                    </Col>
                    <Col sm={9}>
                      <p style={{ textAlign: 'justify', }}>{cert.meaning}</p>
                    </Col>
                  </>
                );
              })}
          </Row>
        </Container>

        <footer className="slowcut_footer">
          Slowcut is just a{' '}
          <a href="https://letterboxd.com/" target="_blank">
            Letterboxd clone
          </a>
          .<br /> All data is provided by{' '}
          <a href="https://developers.themoviedb.org/3/" target="_blank">
            The Movie Database (TMDb) API
          </a>
          .<br /> Watch Provider data provided by{' '}
          <a href="https://www.justwatch.com/us">Just Watch</a>.
          <br />
          <Button variant="primary" onClick={handleShow}>
            Learn more about the Motion Picture Association film rating system.
          </Button>
          {/* <Modal
            {...certifications}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ backgroundColor: '#789' }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Motion Picture Association Film Rating System
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal> */}
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
