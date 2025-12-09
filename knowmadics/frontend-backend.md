# Frontend/Backend Development Interview

## React Fundamentals
- Hooks:
    1. useState
    ```jsx
    import { useState } from 'react';

    function SatelliteTracker() {
    const [satellites, setSatellites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSatellite, setSelectedSatellite] = useState(null);
    
    // Update state
    const addSatellite = (satellite) => {
        setSatellites(prev => [...prev, satellite]);
    };
    
    // Update based on previous state
    const toggleFavorite = (id) => {
        setSatellites(prev => 
        prev.map(sat => 
            sat.id === id 
            ? { ...sat, favorite: !sat.favorite }
            : sat
        )
        );
    };
    
    return (
        <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {satellites.map(sat => (
            <div key={sat.id} onClick={() => setSelectedSatellite(sat)}>
            {sat.name}
            </div>
        ))}
        </div>
    );
    }
    ```

    2. useEffect
    ```jsx
    import { useState, useEffect } from 'react';

    function SatelliteData({ satelliteId }) {
    const [data, setData] = useState(null);
    
    // Fetch data on mount and when satelliteId changes
    useEffect(() => {
        let cancelled = false;
        
        async function fetchData() {
        try {
            const response = await fetch(`/api/satellites/${satelliteId}`);
            const json = await response.json();
            
            if (!cancelled) {
            setData(json);
            }
        } catch (err) {
            if (!cancelled) {
            console.error(err);
            }
        }
        }
        
        fetchData();
        
        // Cleanup function to prevent state updates after unmount
        return () => {
        cancelled = true;
        };
    }, [satelliteId]); // Dependency array
    
    // Setup/teardown effect (runs once)
    useEffect(() => {
        const interval = setInterval(() => {
        console.log('Polling for updates...');
        }, 5000);
        
        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []); // Empty array = runs once
    
    return <div>{data ? data.name : 'Loading...'}</div>;
    }
    ```

    3. useCallback
    4. useMemo
    5. useReducer
    6. useContext