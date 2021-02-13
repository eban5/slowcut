import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useFetchGenre, useFetchPopularMovies } from '../hooks/useFetch';
import Poster from './Poster';

const Grid = (props: any) => {
  const { genreID } = props.match.params;

  // if params is empty, then just show a grid of popular
  const { status, data } = useFetchGenre(genreID);
  // Object.keys(props.match.params).length === 0
  // ? useFetchPopularMovies(0)
  // : useFetchGenre(genreID);

  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <div className="grid">
              {status !== 'fetching' &&
                data.map((item: any, idx: number) => {
                  return <Poster key={idx} item={item} />;
                })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Grid;
