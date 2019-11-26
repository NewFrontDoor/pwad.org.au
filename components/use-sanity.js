import {useState, useEffect} from 'react';
import {fetchQuery} from '../lib/sanity';

export const useFetch = (query, params) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuery(query, params)
      .then(setResult)
      .catch(setError);
  }, [query, params]);

  return [result, error];
};
