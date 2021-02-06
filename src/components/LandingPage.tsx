import React from "react";
import { Showcase } from "./Showcase";
import { CustomCarousel as Carousel } from "./Carousel";

import StackedCards from "./StackedCards";
import About from "./About";

import slowcut from "../images/slowcut.png";

import { Badge, Col, Container, Row, Media } from "react-bootstrap";

const LandingPage = () => {
	return (
		<div className="App">
			{/* Showcase / Hero */}
			<Container>
				<Row className="justify-content-md-center">
					<Col>
						{" "}
						<div id="showcase">
							<Showcase />
						</div>
					</Col>
				</Row>
			</Container>

			{/* Carousel - Featured Movies */}
			<Container>
				<Row>
					<Col>
						<div id="carousel">
							{/* <h4 className="section_header">Popular This Week</h4> */}

							<Carousel />
						</div>
					</Col>
				</Row>
			</Container>

			{/* About - Features / Links */}
			<Container>
				<Row>
					<Col>
						<div id="about">
							<h4 className="section_header">About</h4>
							<About />
						</div>
					</Col>
				</Row>
			</Container>

			<Container>
				<Row>
					<Col sm={8}>
						{/* Popular Reviews This Week */}
						<div id="popular-reviews">
							<h4 className="section_header">Popular Reviews</h4>
							<h5>User Personface</h5>
							<p>
								Arcu purus augue euismod sociosqu justo nec vulputate, aliquet duis
								quisque felis luctus morbi ut cras, viverra leo blandit in rutrum
								aenean. Cum odio habitasse dictumst consequat vitae tristique varius
								nam ullamcorper rhoncus ultrices, integer conubia curae ipsum sociis
								sem cras vehicula erat tempus, tempor nibh hendrerit dignissim nunc
								primis neque commodo tortor facilisi.
							</p>
						</div>
					</Col>
					<Col sm={4}>
						{/* Find By Genre */}
						<div id="discover-genre">
							<h4 className="section_header">Discover by Genre</h4>
							<div>
								<Badge pill variant="primary">
									Action/Adventure
								</Badge>
								<Badge pill variant="secondary">
									Science Fiction
								</Badge>
								<Badge pill variant="success">
									Horror
								</Badge>
								<Badge pill variant="danger">
									Drama
								</Badge>
								<Badge pill variant="warning">
									Documentary
								</Badge>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col sm={8}>
						{/* Popular Lists */}
						<div id="popular-lists">
							<h4 className="section_header">Popular Lists</h4>
							<StackedCards />
						</div>
					</Col>
					<Col sm={4}>
						{/* Popular Reviewers */}
						<div className="popular_reviewers">
							<h4 className="section_header">Popular Reviewers</h4>
							<ul>
								<li className="white">
									<Media>
										<img
											width={30}
											height={30}
											className="mr-3"
											src={slowcut}
											alt="Avatar"
										/>
										<Media.Body>
											<h5>User Personface</h5>
										</Media.Body>
									</Media>
								</li>
								<li className="white">
									<Media>
										<img
											width={30}
											height={30}
											className="mr-3"
											src={slowcut}
											alt="Avatar"
										/>
										<Media.Body>
											<h5>User Personface</h5>
										</Media.Body>
									</Media>
								</li>
								<li className="white">
									<Media>
										<img
											width={30}
											height={30}
											className="mr-3"
											src={slowcut}
											alt="Avatar"
										/>
										<Media.Body>
											<h5>User Personface</h5>
										</Media.Body>
									</Media>
								</li>
								<li className="white">
									<Media>
										<img
											width={30}
											height={30}
											className="mr-3"
											src={slowcut}
											alt="Avatar"
										/>
										<Media.Body>
											<h5>User Personface</h5>
										</Media.Body>
									</Media>
								</li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>

			<footer
				style={{
					backgroundColor: "black",
					color: "white",
					height: "200px",
					width: "100vw",
					textAlign: "center",
					marginTop: "50px",
					paddingTop: "25px",
				}}>
				Slowcut is just a letterboxd clone.
			</footer>
		</div>
	);
};

export default LandingPage;
