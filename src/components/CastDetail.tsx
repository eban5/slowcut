import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { buildPosterPath } from '../utils/api';
import { PersonGrid } from './Grid';

import '../styles/App.css';

const CastDetail = ({ match }: any) => {
  const {
    params: { personID },
  } = match;

  const personDetailURL: string = `https://api.themoviedb.org/3/person/${personID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`;
  const castDetailURL: string = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`;

  const [personDetails, setPersonDetails] = useState<any>({});
  const [castDetails, setCastDetails] = useState<any>([]);

  useEffect(() => {
    axios
      .get(personDetailURL)
      .then((item: any) => {
        setPersonDetails(item.data);
      })
      .catch((err) => console.error(err));
  }, [personDetailURL]);
  useEffect(() => {
    axios
      .get(castDetailURL)
      .then((item: any) => {
        // sort by release date
        const movies =
          item.data.cast.length > 0
            ? item.data.cast.sort((a: any, b: any) =>
                a.release_date < b.release_date ? 1 : -1
              )
            : item.data.crew.sort((a: any, b: any) =>
                a.release_date < b.release_date ? 1 : -1
              );
        setCastDetails(movies);
      })
      .catch((err) => console.error(err));
  }, [castDetailURL]);

  return (
    <>
      <Container>
        <Row style={{ marginTop: '16px' }}>
          <Col sm={9}>
            <h1 style={{ lineHeight: '1.2' }}>
              <span className="cast_header_intro">Films Starring</span>
              <br />
              {personDetails && personDetails.name}
            </h1>

            <Row>
              <Col>
                <PersonGrid movies={castDetails} />
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
            <img
              style={{ width: '80%', display: 'block', margin: 'auto' }}
              className="cast_profile_pic"
              alt={`${personDetails.name} profile`}
              src={buildPosterPath(`${personDetails.profile_path}`, `w500`)}
            />

            <p style={{ margin: '5px' }} className="white">
              Born: {personDetails.birthday}
              <br />
              {personDetails.deathday ? `Died: ${personDetails.deathday}` : ''}
            </p>
            <p style={{ margin: '5px', textAlign: 'justify' }}>
              {personDetails.biography}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CastDetail;
