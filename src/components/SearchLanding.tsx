import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Media, Row } from 'react-bootstrap';
import { extractYear } from '../utils/api';
import Poster from './Poster';
import { search } from '../utils/api';

export const SearchLanding = (props: any) => {
  const { keyword } = props;
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO - include more result types
  // TODO - swap fetch hooks
  //@ts-ignore
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Someone came to the search landing without entering a keyword
      if (!keyword) {
        setSearchResults([]);
        return;
      } else {
        // Search for their keyword entered
        const results = await search(
          `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );

        setSearchResults(results);
        setLoading(false);
      }
    }
    fetchData();
  }, [keyword]);

  return (
    <div className="white" style={{ marginTop: '25px' }}>
      <Container>
        <Row>
          <Col sm={8}>
            {!keyword ? (
              <Col sm={8}>Please enter a search term above.</Col>
            ) : (
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
                          <Poster item={item} />

                          <Media.Body style={{ marginLeft: '8px' }}>
                            <h5>
                              {item.title}{' '}
                              <span style={{ color: 'gray' }}>
                                {extractYear(item.release_date)}
                              </span>
                            </h5>

                            <p style={{ fontSize: '0.8rem' }}>
                              {item.overview}
                            </p>
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
            )}
          </Col>
          <Col sm={4}>
            {keyword && searchResults && searchResults.length > 0 ? (
              <div className="white">
                {searchResults.length} matches for <em>{keyword}</em>
              </div>
            ) : (
              <div></div>
            )}
            {/* // TODO wrap badges in links  */}

            <div className="white">
              Filter by
              <Badge variant="secondary">Actor</Badge>
              <Badge variant="secondary">Director</Badge>
              <Badge variant="secondary">Movie</Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchLanding;
