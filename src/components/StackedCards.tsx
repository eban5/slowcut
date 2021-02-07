import React from "react";
import "../styles/StackedCards.css";
import { useFetchMovies } from "../hooks/useFetch";

interface StackedCardsProps {
	keyword: string;
}

const StackedCards = (props: StackedCardsProps) => {
	const { keyword } = props;
	const { status, data } = useFetchMovies(keyword);

	return (
		<>
			{status === "fetching" ? (
				<div className="white">Loading...</div>
			) : (
				<>
					<div className="parent">
						{data.map((item: any, idx: any) => {
							// TODO convert to Poster component
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
				</>
			)}
		</>
	);
};

export default StackedCards;
