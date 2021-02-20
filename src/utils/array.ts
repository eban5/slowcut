import { ContentProviders, JustWatchResults } from '../types/types';

// return a random string from the array of strings
export const getRandomItem = (arr: string[]): any => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const contentProviders: string[] = [
  'Apple iTunes',
  'Google Play Movies',
  'Amazon Video',
  'YouTube',
];

export const parseCrewMembers = (crew: any) => {
  const director = crew.filter((item: any) => item.job === 'Director');
  const producers = crew.filter((item: any) => item.job === 'Producer');
  const executiveProducer = crew.filter(
    (item: any) => item.job === 'Executive Producer'
  );
  const editors = crew.filter((item: any) => item.job === 'Editor');
  const dp = crew.filter((item: any) => item.job === 'Director of Photography');
  const composer = crew.filter(
    (item: any) => item.job === 'Original Music Composer'
  );

  return [
    ...director,
    ...producers,
    ...executiveProducer,
    ...editors,
    ...dp,
    ...composer,
  ];
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

  let result: ContentProviders = {
    apple_itunes: [],
    google_play: [],
    amazon_video: [],
    youtube: [],
  };

  return result;
};
