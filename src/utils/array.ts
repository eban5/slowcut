// return a random string from the array of strings
export const getRandomItem = (arr: string[]): any => {
	return arr[Math.floor(Math.random() * arr.length)];
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numberWithCommas = (x: string) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
