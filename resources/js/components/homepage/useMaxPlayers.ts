import { useEffect, useState } from 'react';

export const useMaxPlayers = () => {
    const [maxPlayers, setMaxPlayers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.mcsrvstat.us/3/nomroti.net');
            const json = await res.json();
            setMaxPlayers(json?.players?.online ?? 0);
        };

        fetchData();
    }, []);

    return maxPlayers;
};
