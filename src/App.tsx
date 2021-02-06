import React from "react";
import { CustomNavbar as Navbar } from "./Navbar";
import { Showcase } from "./Showcase";
import { CustomCarousel as Carousel } from "./Carousel";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./About";
import { Badge, Col, Container, Row } from "react-bootstrap";

function App() {
	return (
		<>
			{/* Background image */}
			<div className="background_container">
				<div className="background-wrapper">
					<div className="background-image"></div>
					<div className="background-mask"></div>
				</div>
			</div>

			{/* Navbar */}
			<div className="container_navbar">
				<Navbar />
			</div>

			{/* Content */}
			<div className="App">
				{/* Showcase / Hero */}
				<Container>
					<Row>
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
								<h4 className="section_header">Popular This Week</h4>
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
							</div>
						</Col>
						<Col sm={4}>
							{/* Popular Lists */}
							<div id="popular-lists">
								<h4 className="section_header">Popular Lists</h4>
							</div>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col sm={8}>
							{/* Recent News */}
							<div id="recent-news">
								<h4 className="section_header">Recent News</h4>
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
			</div>
			<div className="footer">{/* Footer */}</div>
		</>
	);
}

export default App;
