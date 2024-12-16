import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Card from "./Card.jsx";
import "../css/Card.css";
import "../css/Day.css";

library.add(fas, far, fab);

// Function to create a Card component for each activity
function createCard(activity, activityIndex, dayIndex) {
    return (
        <Card 
            key={activityIndex}
            activity={activity} 
            activityIndex={activityIndex} 
            day={dayIndex + 1} // Pass the day as a prop
        />
    );
}

function DisplayCard({ response, onCardDataFetched }) {
    const [parsedResponse, setParsedResponse] = useState(null);
    const [open, setOpen] = useState([]);

    // Parsing the response only on initial render
    useEffect(() => {
        try {
            const parsed = typeof response === 'string' ? JSON.parse(response) : response;
            setParsedResponse(parsed);
            setOpen(new Array(parsed.itinerary.length).fill(true)); // Start with all dropdowns open
        } catch (error) {
            console.error('Error parsing response:', error);
        }
    }, [response]);

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
                    parsedResponse.itinerary.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-card">
                            <button id="drop-down-days" className="day_plan w-full" type="button" onClick={() => toggleDown(dayIndex)}>
                                <div className="flex items-center justify-between border-b-2 border-gray-300">
                                    <h1>Day {dayIndex + 1}</h1>
                                    <FontAwesomeIcon icon={open[dayIndex] ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} />
                                </div>
                            </button>
                            {open[dayIndex] && (
                                <div className="dropdown">
                                    <ul>
                                        {day.activities && day.activities.map((activity, activityIndex) => (
                                            createCard(activity, activityIndex, dayIndex)
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