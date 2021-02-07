// return a random string from the array of strings
export const getRandomItem = (arr: string[]): any => {
	return arr[Math.floor(Math.random() * arr.length)];
};
