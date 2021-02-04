import React, { useState, useEffect } from "react";
import { CustomNavbar as Navbar } from "./Navbar";
import { Showcase } from "./Showcase";
import { CustomCarousel as Carousel } from "./Carousel";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	// const OMDB_API_KEY: string = process.env.REACT_APP_OMDB_API_KEY || "";

	const [slides, setSlides] = useState([]);

	useEffect(() => {
		// const testURL: any = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=batman`;

		// fetch(testURL)
		
	}, []);

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
						<Carousel />
					</div>

					{/* Popular */}
					<section id="popular">Popular</section>

					{/* About - Features / Links */}
					<section id="about">About</section>

					{/* Popular Reviews This Week */}
					<section id="popular-reviews">Popular Reviews</section>

					{/* Popular Lists */}
					<section id="popular-lists">Popular Lists</section>

					{/* Recent News */}
					<section id="recent-news">Recent News</section>
				</div>
			</div>
			<div className="footer">{/* Footer */}</div>
		</>
	);
}

export default App;
