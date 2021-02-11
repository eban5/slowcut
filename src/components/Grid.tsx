import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useFetchPopularMovies } from "../hooks/useFetch";
import Poster from "./Poster";

interface GridProps {
  movies: any[];
}

const Grid = (props: GridProps) => {
  const { movies } = props;

  const { status, data } = useFetchPopularMovies(0);
  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <div className="grid">
              {status !== "fetching" &&
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
