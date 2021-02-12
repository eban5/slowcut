import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useFetchGenre, useFetchPopularMovies } from '../hooks/useFetch';
import Poster from './Poster';

//TODO figure out best type here
// interface GridProps {
//   movies: any[];
// }

const Grid = (props: any) => {
  const { genreID } = props.match.params;

  // TODO - call helper with "genre" or "popular" that decides
  // switch case to take, then build URL, then call right endpoint

  // const { status, data } = useFetchPopularMovies(0);
  const { status, data } = useFetchGenre(genreID);

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
