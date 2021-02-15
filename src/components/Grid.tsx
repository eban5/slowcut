import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useFetchGenre, useFetchPopularMovies } from '../hooks/useFetch';
import Poster from './Poster';

export const PersonGrid = (props: { movies: any[] }) => {
  const { movies } = props;
  return (
    <>
      <Row>
        <Col sm={12}>
          <div className="grid">
            {movies &&
              movies.map((item: any, idx: number) => {
                return <Poster key={idx} item={item} />;
              })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export const Grid = (props: any) => {
  const { genreID } = props.match.params;
  const { genreName } = props.location.state || '';
  // if params is empty, show grid of popular
  // else show genre-specific grid

  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <h4 className="section_header">
              {genreName ? `Browse: ${genreName}` : 'Popular Movies'}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="grid">
              {!genreID ? (
                <PopularGrid />
              ) : (
                <GenreGrid genreName={genreName} genreID={genreID} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const PopularGrid = () => {
  const { status, data } = useFetchPopularMovies(0);
  return (
    <>
      {status !== 'fetching' &&
        data.map((item: any, idx: number) => {
          return <Poster key={idx} item={item} />;
        })}
    </>
  );
};

const GenreGrid = (props: any) => {
  const { status, data } = useFetchGenre(props.genreID);

  return (
    <>
      {status !== 'fetching' &&
        data.map((item: any, idx: number) => {
          return <Poster key={idx} item={item} />;
        })}
    </>
  );
};
