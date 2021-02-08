import React from "react";
import { List, lists } from "../data/lists";
import StackedCards from "./StackedCards";

const PopularLists = () => {
	const popularLists: List[] = lists();
	return (
		<div>
			{popularLists.map((list: List) => {
				console.log(list.title)
				return (
					<>
						<StackedCards />
						<h5>{list.title}</h5>
						<span className="popular_list_user">{list.username}</span>
					</>
				);
			})}
		</div>
	);
};

export default PopularLists;
