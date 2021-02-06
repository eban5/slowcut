import React from "react";
import "../styles/StackedCards.css";
import { useFetchMovies } from "../hooks/useFetch";

const StackedCards = () => {
	const { status, data } = useFetchMovies("superman");

	return (
		<>
			{status === "fetching" ? (
				<div className="white">Loading...</div>
			) : (
				<>
					<div className="parent">
						{data.map((item: any, idx: any) => {
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
					<span className="popular_list_user">User Personface numLikes numComments</span>
					<div className="parent">
						{data.map((item: any, idx: any) => {
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
					<span className="popular_list_user">User Personface numLikes numComments</span>
					<div className="parent">
						{data.map((item: any, idx: any) => {
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
					<span className="popular_list_user">User Personface numLikes numComments</span>
				</>
			)}
		</>
	);
};

export default StackedCards;
