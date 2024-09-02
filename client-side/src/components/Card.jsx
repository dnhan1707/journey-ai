import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePersistState from "../usePersistState";
import "../css/Card.css";
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { placeSearch, placePhotoWithRef, placeDetail } from './PlaceResponse.jsx';
import DetailCard from './DetailCard.jsx';
import { useUser } from '../UserContext.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import default_pic from "../pictures/man_walking.jpg"

function Card(props) {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const { addNewActivity, userUid } = useUser();
    const [openDetail, setOpenDetail] = useState(false);

    // Using usePersistState for caching data
    const [placeDetailData, setPlaceDetailData] = usePersistState(null, `placeDetailData_${props.activity.location_name}`);
    const [photoUrl, setPhotoUrl] = usePersistState(default_pic, `photoUrl_${props.activity.location_name}`);
    const [placeName, setPlaceName] = usePersistState('', 'placeName:' + props.activityIndex);


    const handleCloseSnackBar = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenSnackBar(false);
    }

    const fetchPlaceDetailData = useCallback(async () => {
        if (!placeDetailData || !photoUrl) {
            try {
                const details = await placeSearch(props.activity.location_name);
                const photoURL = await placePhotoWithRef(details.photo_reference);
                
                if (details) {
                    setPlaceName(details.place_name);
                    setPlaceDetailData({
                        place_id: details.place_id,
                        ...details
                    });
                }

                if (photoURL) {
                    setPhotoUrl(photoURL);
                }

                if (userUid && details.place_id) {
                    const detailData = await placeDetail(details.place_id);
                    setPlaceDetailData((prevData) => ({
                        ...prevData,
                        ...detailData,
                    }));
                    
                    const newActivity = {
                        location_name: details.place_name || "Not Found",
                        type: props.activity.type || "Not Found",
                        duration: props.activity.duration || "Not Found",
                        description: props.activity.description || "Not Found", 
                        place_detail: {
                            location: detailData.geometry?.location || "Not Found",
                            place_id: details.place_id || "Not Found",
                            photo_url: photoURL || "Not Found",
                            price_level: props.activity.price_level || "Not Found",
                            formatted_address: detailData.formatted_address || "Not Found",
                            formatted_phone_number: detailData.formatted_phone_number || "Not Found",
                            website: detailData.website || "Not Found",
                            opening_hours: {
                                weekday_text: detailData.opening_hours?.weekday_text || []
                            },
                            reviews: detailData.reviews || []
                        }
                    };
                    addNewActivity(newActivity, props.dayindex, props.activityIndex);
                }
            } catch (err) {
                console.error("Error fetching place details:", err);
            }
        }
    }, [placeDetailData, photoUrl, props.activity.location_name, userUid, addNewActivity]);

    useEffect(() => {
        fetchPlaceDetailData();
    }, [fetchPlaceDetailData]);

    const iconDefinition = findIconDefinition({ iconName: props.activity.type });

    const cardDetailClicked = () => {
        if (userUid) {
            setOpenDetail((prevState) => !prevState);
        } else {
            setOpenSnackBar(true);
        }
    };

    return (
        <>
            
            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleCloseSnackBar}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please login or signup to see more details.
                </Alert>
            </Snackbar>
    
            <div key={props.activityIndex} className="detail pt-6">
                {userUid && (
                    <DetailCard
                        show={openDetail}
                        onClose={cardDetailClicked}
                        placeDetailData={placeDetailData}
                        placeName={placeName}
                        photoURL={photoUrl}
                    />
                )}
                <div className="card flex w-full rounded-lg bg-gray-50 p-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100">
                    <div className="location_description flex">
                        <div className="description">
                            <button
                                className="font-semibold text-lg  focus:outline-none transition-colors duration-200 hover:text-orange-600"
                                onClick={cardDetailClicked}
                                title={!userUid ? "Please Log-in or Sign-up to see more detail" : ""}
                            >
                                <FontAwesomeIcon icon={iconDefinition} className="mr-2" /> {placeName}
                            </button>
                            <p className="card-description w-5/6 text-slate-500 text-base mt-1">{props.activity.description}</p>
                        </div>
                        <div className='flex flex-row items-center mt-2'>
                            <div className="relative w-fit cursor-default items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-3 py-0.5 text-xs md:text-sm shadow-sm transition-shadow duration-200 hover:shadow-md">
                                <p className="text-gray-500">{props.activity.duration}</p>
                            </div>
                            <p className="px-3">
                                • <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />{props.activity.price_level}
                            </p>
                        </div>
                    </div>
                    <div className="location_image rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 max-w-[175px] max-h-[175px]">
                        {photoUrl && (
                            <img
                                src={photoUrl}
                                alt="Place"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
