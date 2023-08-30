import { useState, useEffect } from 'react';

export function useEnsResolver(ensName) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);

    useEffect(() => {
        if (hasError) {
            setError(true);
            return;
        }
        fetch(`https://ensdata.net/${ensName}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.error || !data.address) {
                    setError(true);
                    return;
                }
                setData(data.address);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
            });
    }, [ensName, hasError]);

    return { address: data, loading, hasError };
}