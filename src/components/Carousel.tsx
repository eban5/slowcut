import React from 'react';
import { Movie } from '../types/types';
import Poster from './Poster';
import '../styles/Carousel.css';

interface CarouselProps {
  movies: Movie[];
}

export const CustomCarousel = (props: CarouselProps) => {
  const movies: Movie[] = props.movies;
  return (
    <>
      <ul className="carousel_content">
        {movies &&
          movies.map((item: any, index: number) => {
            return (
              // link to the movie details page for onClick
              <li key={index}>
                <Poster type="default" key={index} item={item} />
              </li>
            );
          })}
      </ul>
    </>
  );
};
