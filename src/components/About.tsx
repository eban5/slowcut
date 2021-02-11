import React from "react";
import { Card, CardGroup, Media } from "react-bootstrap";
import slowcutIcon from "../images/slowcut.png";
import heartWhite from "../images/heart-white.png";
import heartGray from "../images/heart-gray.png";

import "../styles/About.css";
const About = () => {
  return (
    <>
      {/* // TODO: On Hover  */}
      <CardGroup>
        <Card bg="dark" text="white">
          <Card.Body className="about_card">
            <Media>
              <div
                // width={40}
                // height={40}
                className="mr-3 card_image card_image-keep"
                // src={slowcutIcon}
                // alt="About text"
              />
              <Media.Body>
                <span className="about_text">
                  Keep track of every film you’ve ever watched (or just start
                  from the day you join)
                </span>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>

        <Card bg="dark" text="white">
          <Card.Body className="about_card">
            <Media>
              <div className="mr-3 card_image card_image-show" />
              <Media.Body>
                <span className="about_text">
                  Show some love for your favorite films, lists and reviews with
                  a “like”
                </span>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>

        <Card bg="dark" text="white">
          <Card.Body className="about_card">
            <Media>
              <div className="mr-3 card_image card_image-write" />
              <Media.Body>
                <span className="about_text">
                  Write and share reviews, and follow friends and other members
                  to read theirs
                </span>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>
      </CardGroup>

      <CardGroup>
        <Card bg="dark" text="white">
          <Card.Body className="about_card">
            <Media>
              <div className="mr-3 card_image card_image-rate" />
              <Media.Body>
                <span className="about_text">
                  Rate each film on a five-star scale (with halves) to record
                  and share your reaction
                </span>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>

        <Card bg="dark" text="white">
          <Card.Body className="about_card">
            <Media>
              <div className="mr-3 card_image card_image-diary" />
              <Media.Body>
                <span className="about_text">
                  Keep a diary of your film watching (and upgrade to{" "}
                  <strong>Pro</strong> for comprehensive stats)
                </span>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>

        <Card bg="dark" text="white">
          <Card.Body className="about_card">
            <Media>
              <div className="mr-3 card_image card_image-lists" />
              <Media.Body>
                <span className="about_text">
                  Compile and share lists of films on any topic and keep a
                  watchlist of films to see
                </span>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default About;
