import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Card from "./Card.jsx";
import "../css/Card.css";
import "../css/Day.css";
import { useUser } from "../UserContext.js";

library.add(fas, far, fab);

function createCard(activity, activityIndex, dayindex) {
    return <Card activity={activity} activityIndex={activityIndex} dayindex={dayindex}/>;
}

function DisplayCard({ response }) {
    const [parsedResponse, setParsedResponse] = useState(null);
    const [open, setOpen] = useState([]);
    const { setItinerary } = useUser();

    // Parsing the response only on initial render
    useEffect(() => {
        try {
            const parsed = typeof response === 'string' ? JSON.parse(response) : response;
            setParsedResponse(parsed);

            const initialItinerary = parsed.itinerary.map((day, dayIndex) => ({
                day: dayIndex + 1,
                activities: day.activities || []
            }));

            setItinerary(initialItinerary);

            // Initialize the open state based on the number of days in the itinerary
            setOpen(new Array(parsed.itinerary.length).fill(true)); // Start with all dropdowns closed
        } catch (error) {
            console.error('Error parsing response:', error);
        }
    }, [response, setItinerary]);

    // Memoized function to toggle dropdown visibility
    const toggleDown = useCallback((index) => {
        setOpen((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }, []);

    return (
        <div className="detail_plan">
            <div id="card-container">
                {parsedResponse && parsedResponse.itinerary ? (
                    parsedResponse.itinerary.map((day, dayindex) => (
                        <div key={dayindex} className="day-card">
                            <button id="drop-down-days" className="day_plan w-full" type="button" onClick={() => toggleDown(dayindex)}>
                                <div className="flex items-center justify-between border-b-2 border-gray-300">
                                    <h1>Day {dayindex + 1}</h1>
                                    <FontAwesomeIcon icon={open[dayindex] ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} />
                                </div>
                            </button>
                            {open[dayindex] && (
                                <div className="dropdown">
                                    <ul>
                                        {day.activities && day.activities.map((activity, activityIndex) => (
                                            createCard(activity, activityIndex, dayindex)
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
    );
}

export default DisplayCard;
