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
    ```jsx
        import { useState, useCallback, useMemo } from 'react';

        function SatelliteList({ satellites }) {
        const [searchTerm, setSearchTerm] = useState('');
        
        // Memoize expensive computations
        const filteredSatellites = useMemo(() => {
            console.log('Filtering satellites...');
            return satellites.filter(sat => 
            sat.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [satellites, searchTerm]); // Only recompute when these change
        
        // Memoize callback functions to prevent child re-renders
        const handleSelect = useCallback((id) => {
            console.log('Selected:', id);
            // Do something with id
        }, []); // Empty deps = function never changes
        
        const handleDelete = useCallback((id) => {
            // Delete logic
        }, []); // This is stable, safe to pass to children
        
        return (
            <div>
            <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredSatellites.map(sat => (
                <SatelliteCard 
                key={sat.id}
                satellite={sat}
                onSelect={handleSelect}  // Won't cause re-render
                onDelete={handleDelete}
                />
            ))}
            </div>
        );
        }

        // Child component
        const SatelliteCard = React.memo(({ satellite, onSelect, onDelete }) => {
        console.log('Rendering card:', satellite.name);
        return (
            <div onClick={() => onSelect(satellite.id)}>
            {satellite.name}
            <button onClick={() => onDelete(satellite.id)}>Delete</button>
            </div>
        );
        });
    ```

    5. useReducer
        - Same as useState but more for data then UI
    6. useContext