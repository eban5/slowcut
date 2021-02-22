import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Genre = (props: any) => {
  const genreID: number = props.genreID;
  const genreName: string = props.genreName;

  let lookupGenreName: string = `${genreName[0].toLowerCase()}${genreName.substr(
    1
  )}`;

  if (genreName === 'Science Fiction') lookupGenreName = 'science-fiction';
  else if (genreName === 'TV Movie') lookupGenreName = 'tv-movie';

  return (
    <Link
      to={{
        pathname: `/films/genre/${lookupGenreName}`,
        state: {
          genreName: genreName,
          genreID: genreID,
        },
      }}
    >
      <Badge pill variant="secondary" key={genreID} className="genre_badge">
        {genreName}
      </Badge>
    </Link>
  );
};

export default Genre;
