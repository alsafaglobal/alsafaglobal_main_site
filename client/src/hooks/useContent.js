import { useState, useEffect } from 'react';
import { client } from '../sanityClient';

export default function useContent(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    client.fetch(query)
      .then((res) => {
        if (!mounted) return;
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [query]);

  return { data, loading, error };
}
