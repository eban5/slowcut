import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GenreLookup } from '../data/lists';

const Genre = (props: any) => {
  const genreID: number = props.genreID;
  const genreName: string = props.genreName;

  let lookupGenreName: string = `${genreName[0].toLowerCase()}${genreName.substr(
    1
  )}`;

  if (genreName === 'Science Fiction') lookupGenreName = 'science-fiction';
  else if (genreName === 'TV Movie') lookupGenreName = 'tv-movie';

  // const lookupGenre: string = GenreLookup[genreName[0].toUpperCase()]
  //   .toLowerCase()
  //   .replace(' ', '-');
  let lookupGenreID: number = GenreLookup[lookupGenreName];

  console.log('lookupGenreName', lookupGenreName);
  console.log('lookupGenreID', lookupGenreID);

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
