import React, { useState, useEffect } from "react";
import { CustomNavbar as Navbar } from "./Navbar";
import { Showcase } from "./Showcase";
import { CustomCarousel as Carousel } from "./Carousel";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const OMDB_API_KEY: string = process.env.REACT_APP_OMDB_API_KEY || "";

	const [slides, setSlides] = useState([]);

	useEffect(() => {
		const testURL: any = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=batman`;

		fetch(testURL)
			.then((success) => {
				console.log(success.json())
			})
			.then((movies) => {
				console.log(movies);
			})
			.catch((error) => console.error(error));
		// console.log("collection", collection);
		// setSlides(collection);
	}, []);

	return (
		<div className="App">
			{/* Navbar */}
			<Navbar />

			{/* Showcase / Hero */}
			<Showcase />

			{/* Carousel - Featured Movies */}
			<Carousel />

			{/* Popular */}

			{/* About - Features / Links */}

			{/* Popular Reviews This Week */}

			{/* Popular Lists */}

			{/* Recent News */}

			{/* Footer */}
		</div>
	);
}

export default App;
