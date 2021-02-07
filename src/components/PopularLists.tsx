import React from "react";
import { List, lists, randomSearchTerms } from "../data/lists";
import { getRandomItem } from "../utils/array";
import StackedCards from "./StackedCards";

const PopularLists = () => {
	const popularLists: List[] = lists();
	return (
		<div>
			{popularLists.map((list: List) => {
				const searchTerm: string = getRandomItem(randomSearchTerms);
				return (
					<>
						<StackedCards keyword={searchTerm} />
						<h5>{list.title}</h5>
						<span className="popular_list_user">{list.username}</span>
					</>
				);
			})}
		</div>
	);
};

export default PopularLists;
