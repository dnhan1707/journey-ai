import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../UserContext.js";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/GenerateMap.css";
import "../css/Day.css";
import CustomizePlan from "../components/CustomizePlan.jsx";
import ImageContainer from "../components/ImageContainer.jsx";
import UserInfo from "../components/UserInfo.jsx";
import GenerateDestinationCard from "../components/GenerateDestinationCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX;

// Initialize the map
const initMap = (mapRef) => {
    return new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-118.2437, 34.0522],
        zoom: 10,
    });
};

// Create a card component for each activity
const createCard = (activity, activityIndex) => (
    <GenerateDestinationCard key={activityIndex} activity={activity} activityIndex={activityIndex} />
);

function GenerateDestinationPage() {
    const [open, setOpen] = useState([]);
    const [planData, setPlanData] = useState(null);
    const [center, setCenter] = useState(null);
    const [zoom, setZoom] = useState(null);
    const mapRef = useRef(null);
    const mapObj = useRef(null);
    const markerObj = useRef(null);
    const [city, setCity] = useState('');
    const { userUid, getPlanById } = useUser();
    const { state } = useLocation();
    const planId = state.plan_id;

    // Fetch plan data
    useEffect(() => {
        const fetchPlanData = async () => {
            const data = await getPlanById(planId);
            setPlanData(data);
            if (data && data.itinerary) {
                setOpen(new Array(data.itinerary.length).fill(true));
            }
        };

        fetchPlanData();
    }, [planId, getPlanById, userUid]);

    // Fetch map data
    useEffect(() => {
        if (planData && planData.city) {
            setCity(planData.city);
            const fetchMapData = async () => {
                try {
                    const response = await fetch("http://localhost:3001/api/mapbox/map", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ location: planData.city })
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

            fetchMapData();
        }
    }, [planData]);

    // Initialize the map
    useEffect(() => {
        if (!mapObj.current) {
            mapObj.current = initMap(mapRef);
        }
    }, []);

    // Update the map center and zoom
    useEffect(() => {
        if (mapObj.current && center) {
            mapObj.current.flyTo({
                center: center,
                zoom: zoom,
                essential: true
            });
        }

        if (center) {
            const lngLat = { lon: center[0], lat: center[1] };

            if (!markerObj.current) {
                markerObj.current = new mapboxgl.Marker({ color: 'red' });
                markerObj.current.setLngLat(lngLat);
                markerObj.current.addTo(mapObj.current);
            } else {
                markerObj.current.setLngLat(lngLat);
            }
        }
    }, [center, zoom]);

    // Toggle dropdown visibility
    const toggleDown = (index) => {
        setOpen((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className="mapPage">
            <div className="map relative">
                <CustomizePlan />
                <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div className="dummy absolute top-0 left-0 w-full h-10 bg-white text-center text-white z-50 lg:hidden md:hidden"></div>
            <div className="detail_container pb-10">
                <ImageContainer location={city} response={planData}/>
                <UserInfo likeOption={true} isInSavedDestinationPage={true} />

                <div className="detail_plan">
                    <div id="card-container">
                        {planData && planData.itinerary ? (
                            planData.itinerary.map((day, index) => (
                                <div key={index} className="day-card">
                                    <button id="drop-down-days" className="day_plan w-full" type="button" onClick={() => toggleDown(index)}>
                                        <div className="flex items-center justify-between border-b-2 border-gray-300">
                                            <h1>Day {index + 1}</h1>
                                            <FontAwesomeIcon icon={open[index] ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} />
                                        </div>
                                    </button>
                                    
                                    {open[index] && (
                                        <div className="dropdown">
                                            <ul>
                                                {day.activities && day.activities.map((activity, activityIndex) => (
                                                    createCard(activity, activityIndex)
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>No itinerary found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateDestinationPage;