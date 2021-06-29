import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { List, lists } from '../data/lists';
import StackedCards from './StackedCards';

const PopularLists = () => {
  const popularLists: List[] = lists();
  return (
    <>
      {popularLists.map((list: List, idx: number) => {
        return (
          <Row key={idx}>
            <Col lg={4}>
              <StackedCards />
            </Col>
            <Col lg={8}>
              <h5>{list.title}</h5>
              <span className="popular_list_user">{list.username}</span>
              <p>{list.description}</p>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default PopularLists;
