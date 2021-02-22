import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { buildPosterPath } from '../utils/api';

interface MoviePoster {
  idx?: string;
  id?: string;
  title?: string;
  release_date?: string;
  poster_path?: string;
  imdbID?: string;
}
interface PosterProps {
  item: MoviePoster;
  type: 'default' | 'carousel' | 'grid';
}

const renderTooltip = (props: MoviePoster) => {
  return (
    <Tooltip
      className="carousel_tooltip"
      key={props.idx}
      id={`button-tooltip-${props.idx}`}
      {...props}
    >
      {props && props.title} (
      {props && props.release_date && props.release_date.substr(0, 4)})
    </Tooltip>
  );
};

const Poster = (props: PosterProps) => {
  const item: MoviePoster = props.item;
  const type: string = props.type || 'default';

  const posterClass =
    type === 'grid'
      ? 'poster poster-grid'
      : type === 'carousel'
      ? 'poster poster-carousel'
      : 'poster';

  // Fallback poster when path is null
  if (!item.poster_path) {
    return (
      // <Link to={`/movie/${item.id}`}> </Link>
      <div className="fallback_poster">
        {item.title} ({item.release_date?.substr(0, 4)})
      </div>
    );
  }
  return (
    <div className={posterClass}>
      <Link to={`/movie/${item.id}`}>
        <OverlayTrigger
          placement="auto"
          delay={{ show: 100, hide: 100 }}
          overlay={renderTooltip(item)}
        >
          <img
            alt={`${item.title} (${item.release_date?.substr(0, 4)})`}
            src={buildPosterPath(`${item.poster_path}`, `w185`)}
          />
        </OverlayTrigger>
      </Link>
    </div>
  );
};

export default Poster;
