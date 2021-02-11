import { ContentProviders, JustWatchResults } from "../types/types";

// return a random string from the array of strings
export const getRandomItem = (arr: string[]): any => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// TODO finish parsing content providers
// For building a prototype, I only care about a handful of content providers to show in my results back from JustWatch API.
// Assuming watch provider data we are using is from US only.
export const parseContentProviders = (
  justWatchData: JustWatchResults[]
): ContentProviders => {
  if (!justWatchData) {
    return {};
  }

  const contentProviders: string[] = [
    "Apple iTunes",
    "Google Play Movies",
    "Amazon Video",
    "YouTube",
  ];

  let result: ContentProviders = {
    apple_itunes: [],
    google_play: [],
    amazon_video: [],
    youtube: [],
  };

  return result;
};
