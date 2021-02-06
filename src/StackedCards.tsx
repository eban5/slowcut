import React, { useState, useEffect } from "react";
import { getMovieIds } from "./utils/omdb";
import axios from "axios";
import "./StackedCards.css";

const StackedCards = () => {
	const [cards, setCards] = useState<any>([]);
	useEffect(() => {
		/* The OMDB API offers searches by either title or ID. The title results are very limited but at least provide an imdbID for each title in the results. To get around this, we need to make two API requests: 1. get titles that match our title search query and then create a list of those imdbIDs 2. then, call the endpoint that accepts imdbIDs as input and request one by one. */
		const searchURL = process.env.REACT_APP_OMDB_API_URL || "";
		axios
			.get(`${searchURL}&s=superman`)
			.then((response) => {
				if (response.data.Search) {
					return getMovieIds(response.data.Search.slice(0, 6));
				}
			})
			.then((response) => {
				response &&
					response.forEach((element: string) => {
						axios
							.get(`${searchURL}&i=${element}`)
							.then((item: any) => {
								setCards((oldCards: any[]) => [...oldCards, item.data]);
							})
							.catch((err) => console.error(err));
					});
			})
			.catch((error) => console.error(error));
	}, []);

	return (
    <>
		<div className="parent">
			{cards.map((item: any, idx: any) => {
				return (
					<div key={idx} className={`child child${idx}`}>
						<img
							className=""
							alt={`${item.Title} (${item.Year})`}
							src={item.Poster}
						/>
					</div>
				);
			})}
		</div>

    <h5>List Title</h5>
    <span className="popular_list_user">User Personface numLikes  numComments</span>
		<div className="parent">
			{cards.map((item: any, idx: any) => {
				return (
					<div key={idx} className={`child child${idx}`}>
						<img
							className=""
							alt={`${item.Title} (${item.Year})`}
							src={item.Poster}
						/>
					</div>
				);
			})}
		</div>

    <h5>List Title</h5>
    <span className="popular_list_user">User Personface numLikes  numComments</span>
		<div className="parent">
			{cards.map((item: any, idx: any) => {
				return (
					<div key={idx} className={`child child${idx}`}>
						<img
							className=""
							alt={`${item.Title} (${item.Year})`}
							src={item.Poster}
						/>
					</div>
				);
			})}
		</div>

    <h5>List Title</h5>
    <span className="popular_list_user">User Personface numLikes  numComments</span>
    </>
    
	);
};

export default StackedCards;
