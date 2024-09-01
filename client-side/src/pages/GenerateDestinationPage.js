import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/GenerateMap.css";
import "../css/Day.css";
import CustomizePlan from "../components/CustomizePlan.jsx";
import ImageContainer from "../components/ImageContainer.jsx";
import UserInfo from "../components/UserInfo.jsx";
import GenerateDestinationCard from "../components/GenerateDestinationCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

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

function createCard(activity, activityIndex) {
    return <GenerateDestinationCard activity={activity} activityIndex={activityIndex} />;
}

function GenerateDestinationPage() {
    const [open, setOpen] = useState([]);
    const [planData, setPlanData] = useState(null);
    const [center, setCenter] = useState(null);
    const [zoom, setZoom] = useState(null);
    const map_ref = useRef(null);
    const map_obj = useRef(null);
    const marker_obj = useRef(null);
    const [city, setCity] = useState('')


    const dataPassedHere = useLocation();
    const data = dataPassedHere.state.saved_plans;
    const plan_id = dataPassedHere.state.plan_id;
    console.log("Chosen plan_id: ", plan_id)
    // const plan_id = 1;

    // console.log(data);

    useEffect(() => {
        const plan = data.find(p => p.plan_id === plan_id);
        setPlanData(plan);
        setOpen(new Array(plan.itinerary.length).fill(true));
    }, [data, plan_id])

    useEffect(() => {
        if (planData && planData.city) {
            setCity(planData.city);
            const fetchMapData = async () => {
                try {
                    const response = await fetch("https://journey-ai-product-version-server.vercel.app/api/mapbox/map", {
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
                <div ref={map_ref} style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div className="dummy absolute top-0 left-0 w-full h-10 bg-white text-center text-white z-50 lg:hidden md:hidden"></div>
            <div className="detail_container pb-10 ">
                <ImageContainer location={city}></ImageContainer>
                <UserInfo likeOption={true} isInSavedDestinationPage={true}/>

                <div className="detail_plan">
                    <div id="card-container">
                        {planData && planData.itinerary ? (
                            planData.itinerary.map((day, index) => (
                                <div key={index} className="day-card">
                                    <button id="drop-down-days" className="day_plan w-full" type="button" onClick={() => toggleDown(index)}>
                                        <div className="flex items-center justify-between border-b-2 border-gray-300">
                                            <h1>Day {index + 1}</h1>
                                            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
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
