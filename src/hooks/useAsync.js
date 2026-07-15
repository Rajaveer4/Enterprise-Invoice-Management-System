import { useCallback, useEffect, useState } from 'react';

export function useAsync(loader, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const run = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loader();
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, reload: run };
}
