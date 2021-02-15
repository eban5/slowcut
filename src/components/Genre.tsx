import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Genre = (props: any) => {
  const { genreID, genreName } = props;

  return (
    <Link
      to={{
        pathname: `/genre/${genreID}`,
        state: {
          genreName: genreName,
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
