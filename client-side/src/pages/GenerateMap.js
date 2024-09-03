import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "react-router-dom";
import "../css/GenerateMap.css"
import DetailContainer from "../components/DetailContainer.jsx";
import { useUser } from "../UserContext.js";
// import CustomizePlan from "../components/CustomizePlan.jsx";

// public token
mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX;

// initialize map obj with CTOR
const init_map = (map_ref) => {
    return new mapboxgl.Map({
        container: map_ref.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-118.2437, 34.0522], // initial center of map when first loaded
        zoom: 10, // initial zoom level
    });
};

function getAllLocationName(responseData){
    if (!responseData || !responseData.itinerary) return [];

    const itinerary = responseData.itinerary;
    const location_names = [];

    itinerary.forEach(days => {
        let activities = days.activities;
        activities.forEach(activity => {
            location_names.push(activity.location_name);
        });
    });

    return location_names;
}

function GenerateMap() {
    const [parsedResponse, setParsedResponse] = useState(null);
    const location = useLocation(); // location.state.location and location.state.responseData
    const response = location.state.responseData;
    const { setCity, setDuration, setTripName, setTotalEstimation} = useUser();

    useEffect(() => {
        try {
            setCity(location.state.location);
            const parsed = typeof response === 'string' ? JSON.parse(response) : response;
            setParsedResponse(parsed);
            setDuration(parseInt(parsed.duration));
            setTripName(parsed.tripName);
            setTotalEstimation(parsed.estimated_total);
        } catch (error) {
            console.error('Error parsing response:', error);
        }
    }, [response]);


    const location_names = getAllLocationName(parsedResponse);
    // console.log(location_names);

    const [center, setCenter] = useState(null);
    const [zoom, setZoom] = useState(null);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await fetch("https://journey-ai-olive.vercel.app/api/mapbox/map", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ location: location.state.location })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCenter(data.center);
                setZoom(data.zoom);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        if (location.state?.location) {
            fetchMapData();
        }
    }, [location.state]);

    const map_ref = useRef(null);
    const map_obj = useRef(null);
    const marker_obj = useRef(null);

    useEffect(() => {
        if (!map_obj.current) {
            map_obj.current = init_map(map_ref);
        }
    }, []);

    useEffect(() => {
        if (map_obj.current && center) {
            map_obj.current.flyTo({
                center: center,
                zoom: zoom,
                essential: true
            });
        }

        if (center) {
            const lngLat = { lon: center[0], lat: center[1] };

            if (!marker_obj.current) {
                marker_obj.current = new mapboxgl.Marker({ color: 'red' });
                marker_obj.current.setLngLat(lngLat);
                marker_obj.current.addTo(map_obj.current);
            } else {
                marker_obj.current.setLngLat(lngLat);
            }
        }
    }, [center, zoom]);

    return (
        <div className="mapPage">
            <div className="map relative">
                {/* <CustomizePlan /> */}
                <div ref={map_ref} style={{ width: '100%', height: '100%' }}></div>
            </div>
            <DetailContainer location={location} />
        </div>
    );
}

export default GenerateMap;
