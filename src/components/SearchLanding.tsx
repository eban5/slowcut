import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Form, Media, Row } from 'react-bootstrap';
import { useFetchMovies } from '../hooks/useFetch';
import { buildPosterPath, extractYear } from '../utils/api';
import Poster from './Poster';
import { search } from '../utils/api';

export const SearchLanding = (props: any) => {
  const { keyword } = props;
  // const { status, data } = useFetchMovies(keyword);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO - swap fetch hooks
  //@ts-ignore
  useEffect(async () => {
    setLoading(true);

    if (!keyword) {
      setSearchResults([]);
      return;
    } else {
      const res = await search(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      const movies = res;
      setSearchResults(movies);
      setLoading(false);
    }
  }, []);

  if (!keyword) {
    return (
      <div className="white" style={{ marginTop: '25px' }}>
        <Container>
          <Row>
            <Col sm={8}>Please enter a search term above.</Col>
          </Row>
        </Container>
      </div>
    );
  }
  return (
    <div className="white" style={{ marginTop: '25px' }}>
      <Container>
        <Row>
          <Col sm={8}>
            <ul className="list-unstyled" style={{ paddingTop: '15px' }}>
              {loading === false &&
              searchResults &&
              searchResults.length > 0 ? (
                searchResults.map((item: any, idx: number) => {
                  return (
                    <li
                      style={{
                        borderBottom: '1px solid gray',
                        padding: '15px',
                        marginBottom: '15px',
                      }}
                      className="white"
                      key={idx}
                    >
                      <Media>
                        {/* //TODO: convert to Poster with Link - reuse everywhere */}
                        <Poster item={item} />

                        <Media.Body style={{ marginLeft: '8px' }}>
                          <h5>
                            {item.title}{' '}
                            <span style={{ color: 'gray' }}>
                              {extractYear(item.release_date)}
                            </span>
                          </h5>

                          <p style={{ fontSize: '0.8rem' }}>{item.overview}</p>
                        </Media.Body>
                      </Media>
                    </li>
                  );
                })
              ) : (
                <div className="not_found">
                  Nothing was found when searching for{' '}
                  <strong>{keyword}</strong>.
                </div>
              )}
            </ul>
          </Col>
          <Col sm={4}>
            {searchResults && searchResults.length > 0 ? (
              <div className="white">
                {searchResults.length} matches for <em>{keyword}</em>
              </div>
            ) : (
              <div></div>
            )}
            <div className="white">
              Filter by
              <Badge pill variant="secondary">
                Actor
              </Badge>
              <Badge pill variant="secondary">
                Director
              </Badge>
              <Badge pill variant="secondary">
                Movie
              </Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchLanding;
