import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useFetchGenre } from '../hooks/useFetch';
import { buildPosterPath } from '../utils/api';
import { PersonGrid } from './Grid';
import Poster from './Poster';

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
        console.log(item);
        setPersonDetails(item.data);
      })
      .catch((err) => console.error(err));
  }, [match]);
  useEffect(() => {
    axios
      .get(castDetailURL)
      .then((item: any) => {
        console.log(item.data);
        setCastDetails(item.data);
      })
      .catch((err) => console.error(err));
  }, [match]);

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <strong>Films Starring</strong>
            <br />
            <h5 className="section_header">
              {personDetails && personDetails.name}
            </h5>
            <Row>
              <Col>
                <PersonGrid movies={castDetails.cast} />
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <img
              width={200}
              className="poster"
              alt={`${personDetails.name} profile picture`}
              src={buildPosterPath(`${personDetails.profile_path}`)}
            />
            <p>{personDetails.biography}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CastDetail;
