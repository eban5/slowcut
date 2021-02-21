import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch data from the movie data API
export const useFetchPopularMovies = (props: any) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>([]);

  const { num } = props;

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');

      axios
        .all([
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`
          ),
        ])
        .then(
          axios.spread((...responses) => {
            const page1: any = responses[0];
            const page2: any = responses[1];

            if (page1.data) setData(page1.data.results);
            if (page2.data)
              setData((data: any) => [...data, ...page2.data.results]);
          })
        )
        .catch((error) => console.error(error));

      setStatus('fetched');
    };

    fetchData();
  }, [num]);

  return { status, data };
};

export const useFetchMovies = (query: string) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setStatus('fetching');

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
        )
        .then((response) => {
          response.data && setData(response.data.results);
        })
        .catch((error) => console.error(error));

      setStatus('fetched');
    };

    fetchData();
  }, [query]);

  return { status, data };
};

export const useFetchGenre = (genreID: string) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!genreID) return;

    const fetchData = async () => {
      setStatus('fetching');

      axios
        .all([
          axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&with_genres=${genreID}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2&with_genres=${genreID}`
          ),
        ])
        .then(
          axios.spread((...responses) => {
            const page1: any = responses[0];
            const page2: any = responses[1];

            if (page1.data) setData(page1.data.results);
            if (page2.data)
              setData((data: any) => [...data, ...page2.data.results]);
          })
        )
        .catch((error) => console.error(error));

      setStatus('fetched');
    };

    fetchData();
  }, [genreID]);

  return { status, data };
};

export const useFetchCast = (personID: string) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!personID) return;

    const fetchData = async () => {
      setStatus('fetching');

      axios
        .get(
          `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        )
        .then((response) => {
          console.log(response);
          response.data && setData(response.data.results);
        })
        .catch((error) => console.error(error));

      setStatus('fetched');
    };

    fetchData();
  }, [personID]);

  return { status, data };
};

export const useFetchSearch = () => {};
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
