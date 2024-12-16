import { useEffect, useState } from "react";
import { placeSearch, placePhotoWithRef, placeDetail } from './PlaceResponse.jsx';
import { useUser } from "../UserContext.js";

function GeminiResponse({ command, setLoading, onDataReceived }) {
    const [data, setData] = useState('');
    const [error, setError] = useState(null);
    const {setPlanToSave} = useUser();
    const port = 5000;

    useEffect(() => {
        const fetchGeminiData = async () => {
            try {
                setLoading(true);

                const response = await fetch(`http://localhost:${port}/api/gemini/gemini_response`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ prompt: command })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const geminiData = await response.json();
                // console.log("Gemini Data:", geminiData.message);

                const combinedData = await combineDetailsAndGemini(geminiData.message);
                onDataReceived(combinedData);
                setData(combinedData);
                // console.log("Combined Data:", combinedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const findDetails = async (geminiData) => {
            const itineraryPromises = geminiData.itinerary.map(async (day) => {
                const activitiesPromises = day.activities.map(async (activity) => {
                    try {
                        const details = await placeSearch(activity.location_name);
                        const photoURL = details ? await placePhotoWithRef(details.photo_reference) : "Not Found";
                        const detailData = details ? await placeDetail(details.place_id) : {};

                        return {
                            ...activity,
                            place_detail: {
                                location: detailData?.geometry?.location || "Not Found",
                                place_id: details?.place_id || "Not Found",
                                photo_url: photoURL,
                                formatted_address: detailData?.formatted_address || "Not Found",
                                formatted_phone_number: detailData?.formatted_phone_number || "Not Found",
                                website: detailData?.website || "Not Found",
                                opening_hours: {
                                    weekday_text: detailData?.opening_hours?.weekday_text || []
                                },
                                reviews: detailData?.reviews || []
                            }
                        };
                    } catch (error) {
                        console.error("Error fetching details for activity:", activity.name, error);
                        return {
                            ...activity,
                            place_detail: {
                                location: "Not Found",
                                place_id: "Not Found",
                                photo_url: "Not Found",
                                formatted_address: "Not Found",
                                formatted_phone_number: "Not Found",
                                website: "Not Found",
                                opening_hours: {
                                    weekday_text: []
                                },
                                reviews: []
                            }
                        };
                    }
                });

                const activitiesListToAdd = await Promise.all(activitiesPromises);
                return { day: day.day, activities: activitiesListToAdd };
            });

            return await Promise.all(itineraryPromises);
        };

        const combineDetailsAndGemini = async (geminiResponse) => {
            const geminiData = typeof geminiResponse === 'string' ? JSON.parse(geminiResponse) : geminiResponse;

            const itinerary = await findDetails(geminiData);
            const planToSave = {
                tripName: geminiData.tripName,
                city: geminiData.city,
                duration: geminiData.duration,
                estimated_total: geminiData.estimated_total,
                itinerary,
                travelers: geminiData.travelers
            };
            await setPlanToSave(planToSave);
            return planToSave;
        };

        if (command) {
            fetchGeminiData();
        }
    }, [command, setLoading, onDataReceived]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    // return (
    //     <div>
    //         {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    //     </div>
    // );
}

export default GeminiResponse;