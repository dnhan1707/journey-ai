import React, { useEffect, useState } from 'react';
// import { placeDetail } from './PlaceResponse';
import CommentCard from './CommentCard';

function DetailCard({ show, onClose, placeDetailData, placeName, photoURL, placeDetailDataFromDb }) {
    const [placeDetails, setPlaceDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const placeDetailData = await placeDetail(placeId);
                // console.log("Fetched place details:", placeDetailData);
                setPlaceDetails(placeDetailData); // Update state with fetched details
            } catch (error) {
                console.error("Error fetching place detail data:", error);
            }
        };

        if (placeDetailDataFromDb) {
            setPlaceDetails(placeDetailDataFromDb);
        } else if (placeDetailData) {
            fetchData();
        }
    }, [placeDetailData, placeDetailDataFromDb]);

    if (!show) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={onClose}
            >
            <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
                <div
                className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
                ></div>
                <div
                className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 overflow-y-auto h-4/5"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="flex-1">
                    <div className="text-2xl font-bold mb-2">{placeName}</div>
                    <div className="text-sm">{placeDetails?.formatted_address || "Loading address..."}</div>
                    </div>
                    <div className="location_image rounded-lg">
                    {photoURL && <img src={photoURL} alt="Place" className="rounded-lg" />}
                    </div>
                </div>

                <div className="pt-5">
                    <div className="text-xl font-bold mb-2">Opening</div>
                    <div>
                    {placeDetails?.opening_hours?.weekday_text ? (
                        placeDetails.opening_hours.weekday_text.map((text, index) => (
                        <div key={index}>{text}</div>
                        ))
                    ) : (
                        "Loading opening hours..."
                    )}
                    </div>
                </div>

                <div className="mb-4 pt-5">
                    <div className="text-xl font-bold mb-2">Rating and Reviews</div>
                    <div className="flex flex-wrap gap-4 p-4">
                    {placeDetails?.reviews ? (
                        placeDetails.reviews.map((review, index) => (
                        <div key={index} className="mb-2">
                            <CommentCard
                            rate={review.rating}
                            time={review.relative_time_description}
                            comment={review.text}
                            />
                        </div>
                        ))
                    ) : (
                        "Loading reviews..."
                    )}
                    </div>
                </div>

                <div className="flex flex-col pt-5">
                    <div className="text-xl font-bold mb-2">Contact</div>
                    <div className="flex flex-row gap-2">
                    <div className="relative w-fit cursor-default items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-3 py-0.5 text-xs md:text-sm truncate">
                        {placeDetails?.website ? (
                        <a href={placeDetails.website}>{placeDetails.website}</a>
                        ) : (
                        "No Available Website"
                        )}
                    </div>
                    <div className="relative w-fit cursor-default items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-3 py-0.5 text-xs md:text-sm">
                        {placeDetails?.formatted_phone_number ? (
                        <a href={placeDetails.formatted_phone_number}>
                            {placeDetails.formatted_phone_number}
                        </a>
                        ) : (
                        "No Available phone number"
                        )}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
}


export default DetailCard;
