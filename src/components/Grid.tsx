import React from 'react';
import { yearFilterOptions, genres } from '../data/lists';
import {
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from 'react-bootstrap';
import { useFetchGenre, useFetchPopularMovies } from '../hooks/useFetch';
import Poster from './Poster';
import { contentProviders } from '../utils/array';
import "../styles/Grid.css"

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
            <h5>Browse By</h5>
            <DropdownButton
              className="grid_filter_dropdown"
              as={ButtonGroup}
              key={0}
              id={`dropdown-grid-0`}
              variant={'info'}
              title={'Year'}
            >
              {yearFilterOptions.map((year: string, idx: number) => {
                return (
                  <Dropdown.Item eventKey={`${idx}`}>{year}</Dropdown.Item>
                );
              })}
            </DropdownButton>
            <DropdownButton
              className="grid_filter_dropdown"
              as={ButtonGroup}
              key={1}
              id={`dropdown-grid-1`}
              variant={'info'}
              title={'Rating'}
            >
              Rating
            </DropdownButton>
            <DropdownButton
              className="grid_filter_dropdown"
              as={ButtonGroup}
              key={2}
              id={`dropdown-grid-2`}
              variant={'info'}
              title={'Popular'}
            >
              Popular
            </DropdownButton>
            <DropdownButton
              className="grid_filter_dropdown"
              as={ButtonGroup}
              key={3}
              id={`dropdown-grid-3`}
              variant={'info'}
              title={'Genre'}
            >
              {genres.map((genre: string, idx: number) => {
                return (
                  <Dropdown.Item eventKey={`${idx}`}>{genre}</Dropdown.Item>
                );
              })}
            </DropdownButton>
            <DropdownButton
              className="grid_filter_dropdown"
              as={ButtonGroup}
              key={4}
              id={`dropdown-grid-4`}
              variant={'info'}
              title={'Service'}
            >
              {contentProviders.map((service: string, idx: number) => {
                return (
                  <Dropdown.Item eventKey={`${idx}`}>{service}</Dropdown.Item>
                );
              })}
            </DropdownButton>
            {/* <DropdownButton
            className="grid_filter_dropdown"
              as={ButtonGroup}
              key={5}
              id={`dropdown-grid-5`}
              variant={'info'}
              title={'Other'}
            >
              Other
            </DropdownButton> */}
            {/* <form>
              <input placeholder="Find a film"></input>
            </form> */}
          </Col>
        </Row>
      </Container>
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
