import React from "react";
import { Card, CardGroup } from "react-bootstrap";

interface CardsProps {
	variant: string;
}

const Cards = (props: CardsProps) => {
	return (
		<Card bg={props.variant.toLowerCase()} text="white" style={{ width: "5rem" }}>
			{/* <Card.Img variant="top" src="holder.js/100px160" /> */}
			<Card.Body>
				<Card.Title>About us</Card.Title>
				<Card.Text>
					This is a wider card with supporting text below as a natural lead-in to
					additional content. This content is a little bit longer.
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

const About = () => {
	return (
		<>
			<CardGroup>
				<Cards variant="Secondary" />
				<Cards variant="Secondary" />
				<Cards variant="Secondary" />
			</CardGroup>

			<CardGroup>
				<Cards variant="Secondary" />
				<Cards variant="Secondary" />
				<Cards variant="Secondary" />
			</CardGroup>
		</>
	);
};

export default About;
