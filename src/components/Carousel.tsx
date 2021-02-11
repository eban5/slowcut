import React from "react";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";
import { Movie } from "../types/types";
import Poster from "./Poster";

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
              <li className="poster" key={index}>
                <Poster key={index} item={item} />
              </li>
            );
          })}
      </ul>
    </>
  );
};
