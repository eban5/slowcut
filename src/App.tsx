import React from "react";
import { CustomNavbar as Navbar } from "./Navbar";
import { Showcase } from "./Showcase";
import { CustomCarousel as Carousel } from "./Carousel";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./About";
import { Col, Container, Row } from "react-bootstrap";

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
				<div className="content-wrap">
					{/* Showcase / Hero */}
					<div id="showcase">
						<Showcase />
					</div>

					{/* Carousel - Featured Movies */}
					<div id="carousel">
						<h4 className="section_header">Popular This Week</h4>
						<Carousel />
					</div>

					{/* About - Features / Links */}
					<div id="about">
						<h4 className="section_header">About</h4>
						<About />
					</div>

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

					{/* Recent News */}
					<section id="recent-news">
						<h4 className="section_header">Recent News</h4>
					</section>
				</div>
			</div>
			<div className="footer">{/* Footer */}</div>
		</>
	);
}

export default App;
