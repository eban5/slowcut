import axios from 'axios';
import { contentProviders } from '../utils/array';
import {
  WatchProviders,
  JustWatchMethod,
  TMDBImageResolution,
} from '../types/types';

const API_REQUEST_PREFIX: string = `https://api.themoviedb.org/3/`;
const API_REQUEST_SUFFIX: string = `?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

export const buildPosterPath = (
  poster_path: string,
  resolution: TMDBImageResolution
): string => {
  return `https://image.tmdb.org/t/p/${resolution}/${poster_path}`;
};

export const buildRequest = (request: string, param: string): string => {
  switch (request) {
    case 'movie-detail':
      return `${API_REQUEST_PREFIX}movie/${param}${API_REQUEST_SUFFIX}`;
    case 'recommended-movies':
      return `${API_REQUEST_PREFIX}movie/${param}/recommendations${API_REQUEST_SUFFIX}`;
    case 'watch-providers':
      return `${API_REQUEST_PREFIX}movie/${param}/watch/providers${API_REQUEST_SUFFIX}`;
    case 'movie-credits':
      return `${API_REQUEST_PREFIX}movie/${param}/credits${API_REQUEST_SUFFIX}`;
    case 'movie-videos':
      return `${API_REQUEST_PREFIX}movie/${param}/videos${API_REQUEST_SUFFIX}`;
    case '':
      console.error(
        `The API request ${request} with param ${param} was not recognized.`
      );
      return '';

    default:
      return '';
  }
};

// TODO write test
// release_date in TMDB API is YYYY-MM-DD
export const extractYear = (release_date: string): string => {
  if (!release_date) {
    return '0000';
  } else {
    return release_date.substr(0, 4);
  }
};

export const filterWatchProviders = (
  providers: WatchProviders
): WatchProviders => {
  let result: WatchProviders = {
    link: providers.link,
    rent: undefined,
    buy: undefined,
    flatrate: undefined,
  };

  if (providers.rent) {
    result.rent = providers.rent.filter((item: JustWatchMethod) => {
      if (contentProviders.includes(item.provider_name)) {
        return item;
      }
      return {};
    });
  }
  if (providers.buy) {
    result.buy = providers.buy.filter((item: JustWatchMethod) => {
      if (contentProviders.includes(item.provider_name)) {
        return item;
      }
      return {};
    });
  }
  if (providers.flatrate) {
    result.flatrate = providers.flatrate.filter((item: JustWatchMethod) => {
      if (contentProviders.includes(item.provider_name)) {
        return item;
      }
      return {};
    });
  }

  return result;
};

const resources: any = {};
const makeRequestCreator = () => {
  let cancel: any;

  return async (query: string) => {
    // check that a request was made
    if (cancel) {
      //cancel previous request before making a new request
      cancel.cancel();
    }

    cancel = axios.CancelToken.source();

    try {
      if (resources[query]) {
        //return result if it exists
        return resources[query];
      }

      const res = await axios(query, { cancelToken: cancel.token });
      const result = res.data.results;

      //store the response so we don't make too many requests we don't have to
      resources[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        //handle if request was cancelled
        console.log('Request cancelled', error.message);
      } else {
        // handle typical errors
        console.log('Something went wrong: ', error.message);
      }
    }
  };
};

export const search = makeRequestCreator();
