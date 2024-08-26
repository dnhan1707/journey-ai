import React, { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../css/Card.css";
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { placeSearch, placePhotoWithRef, placeDetail } from './PlaceResponse.jsx';
import DetailCard from './DetailCard.jsx';
import { useUser } from '../UserContext.jsx';


function Card(props) {
    const [placeName, setPlaceName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('path/to/default/photo.jpg');
    const [price, setPrice] = useState('');
    const [openDetail, setOpenDetail] = useState(false);
    const [placeId, setPlaceId] = useState('');
    const [coordinate, setCoordinate] = useState({});
    // const [isDataFetched, setIsDataFetched] = useState(false);
    const { addNewActivity, userUid } = useUser();
    const [placeDetailData, setPlaceDetailData] = useState(null);
    const [cachedDetail, setCachedDetail] = useState(null);
    const [cachedPhoto, setCachedPhoto] = useState(null);

    const fetchPlaceDetailData = async () => {
        if(cachedDetail && cachedPhoto){
            console.log("  FETCHED ");
            return
        } 
        try {
            const details = await placeSearch(props.activity.location_name);
            const photoURL = await placePhotoWithRef(details.photo_reference);

            if (details) {
                console.log(details);
                setPlaceId(details.place_id);
                setPlaceName(details.place_name);
                setPrice(props.activity.price_level);    
                setCachedDetail(details);
                // setIsDataFetched((prev) => !prev); // Mark data as fetched
            }

            if(photoUrl){
                setPhotoUrl(photoURL);
                setCachedPhoto(photoURL);
            }
            

            if(userUid){
                const placeDetailData = await placeDetail(details.place_id);
                if (placeDetailData.geometry && placeDetailData.geometry.location) {
                    setCoordinate(placeDetailData.geometry.location);
                    setPlaceDetailData(placeDetailData);
                }
                                // Now that all state updates are done, create the newActivity object
                const newActivity = {
                    location_name: details.place_name || "Not Found",
                    type: props.activity.type || "Not Found",
                    duration: props.activity.duration || "Not Found",
                    description: props.activity.description || "Not Found", 
                    place_detail: {
                        location: placeDetailData.geometry?.location || "Not Found",
                        place_id: details.place_id || "Not Found",
                        photo_url: photoURL || "Not Found",
                        price_level: props.activity.price_level || "Not Found",
                        formatted_address: placeDetailData.formatted_address || "Not Found",
                        formatted_phone_number: placeDetailData.formatted_phone_number || "Not Found",
                        website: placeDetailData.website || "Not Found",
                        opening_hours: {
                            weekday_text: placeDetailData.opening_hours?.weekday_text || []
                        },
                        reviews: placeDetailData.reviews || []
                    }
                };
                console.log("Day:", props.dayindex); // Log the new activity object
                console.log("New Activity:", newActivity); // Log the new activity object
                addNewActivity(newActivity, props.dayindex, props.activityIndex);
            }    
        } catch (err) {
            console.error("Error fetching place details:", err);
        }
    };

    useMemo(() => fetchPlaceDetailData(), []);


    // useEffect(() => {
    //     if (isDataFetched) return; // Skip if data is already fetched
    
    //     const fetchPlaceDetailData = async () => {
    //         try {
    //             const details = await placeSearch(props.activity.location_name);
    //             const photoURL = await placePhotoWithRef(details.photo_reference);
    
    //             if (details) {
    //                 console.log(details);
    //                 setPlaceId(details.place_id);
    //                 setPlaceName(details.place_name);
    //                 setPrice(props.activity.price_level);    
    //                 setPhotoUrl(photoURL);
    //                 setIsDataFetched((prev) => !prev); // Mark data as fetched
    //             }
                

    //             if(userUid){
    //                 const placeDetailData = await placeDetail(details.place_id);
    //                 if (placeDetailData.geometry && placeDetailData.geometry.location) {
    //                     setCoordinate(placeDetailData.geometry.location);
    //                     setPlaceDetailData(placeDetailData);
    //                 }
    //                                 // Now that all state updates are done, create the newActivity object
    //                 const newActivity = {
    //                     location_name: details.place_name || "Not Found",
    //                     type: props.activity.type || "Not Found",
    //                     duration: props.activity.duration || "Not Found",
    //                     description: props.activity.description || "Not Found", 
    //                     place_detail: {
    //                         location: placeDetailData.geometry?.location || "Not Found",
    //                         place_id: details.place_id || "Not Found",
    //                         photo_url: photoURL || "Not Found",
    //                         price_level: props.activity.price_level || "Not Found",
    //                         formatted_address: placeDetailData.formatted_address || "Not Found",
    //                         formatted_phone_number: placeDetailData.formatted_phone_number || "Not Found",
    //                         website: placeDetailData.website || "Not Found",
    //                         opening_hours: {
    //                             weekday_text: placeDetailData.opening_hours?.weekday_text || []
    //                         },
    //                         reviews: placeDetailData.reviews || []
    //                     }
    //                 };
    //                 console.log("Day:", props.dayindex); // Log the new activity object
    //                 console.log("New Activity:", newActivity); // Log the new activity object
    //                 addNewActivity(newActivity, props.dayindex, props.activityIndex);
    //             }

    //             setIsDataFetched((prev) => !prev); // Mark data as fetched

    //         } catch (err) {
    //             console.error("Error fetching place details:", err);
    //         }
    //     };
    
    //     fetchPlaceDetailData();
    // }, []);
    
    // const cacheKey = `placeDetail_${props.activity.location_name}`;

    // useEffect(() => {
    //     if (isDataFetched){
    //         console.log("Fetched");
    //         return;
    //     }

    //     const cachedData = localStorage.getItem(cacheKey);
    //     if (cachedData) {
    //         console.log("NOT Fetched");

    //         const data = JSON.parse(cachedData);
    //         setPlaceName(data.placeName);
    //         setPhotoUrl(data.photoUrl || 'path/to/default/photo.jpg');
    //         setPrice(data.price);
    //         setPlaceDetailData(data.placeDetailData);
    //         setCoordinate(data.coordinate);
    //         setPlaceId(data.placeId);
    //         setIsDataFetched((prev) => !prev);
    //     } else {
    //         const fetchPlaceDetailData = async () => {
    //             try {
    //                 const details = await placeSearch(props.activity.location_name);
    //                 const photoURL = details.photo_reference 
    //                     ? await placePhotoWithRef(details.photo_reference)
    //                     : 'path/to/default/photo.jpg';

    //                 if (details) {
    //                     setPlaceId(details.place_id);
    //                     setPlaceName(details.place_name);
    //                     setPrice(props.activity.price_level);
    //                     setPhotoUrl(photoURL);

    //                     if (userUid) {
    //                         const placeDetailData = await placeDetail(details.place_id);
    //                         console.log("Place detail data:", placeDetailData);
    //                         setPlaceDetailData(placeDetailData);
    //                         if (placeDetailData.geometry && placeDetailData.geometry.location) {
    //                             setCoordinate(placeDetailData.geometry.location);
    //                         }

    //                         const newActivity = {
    //                             location_name: details.place_name || "Not Found",
    //                             type: props.activity.type || "Not Found",
    //                             duration: props.activity.duration || "Not Found",
    //                             description: props.activity.description || "Not Found",
    //                             place_detail: {
    //                                 location: placeDetailData.geometry?.location || "Not Found",
    //                                 place_id: details.place_id || "Not Found",
    //                                 photo_url: photoURL || "Not Found",
    //                                 price_level: props.activity.price_level || "Not Found",
    //                                 formatted_address: placeDetailData.formatted_address || "Not Found",
    //                                 formatted_phone_number: placeDetailData.formatted_phone_number || "Not Found",
    //                                 website: placeDetailData.website || "Not Found",
    //                                 opening_hours: {
    //                                     weekday_text: placeDetailData.opening_hours?.weekday_text || []
    //                                 },
    //                                 reviews: placeDetailData.reviews || []
    //                             }
    //                         };

    //                         localStorage.setItem(cacheKey, JSON.stringify({
    //                             placeName: details.place_name,
    //                             photoUrl: photoURL,
    //                             price: props.activity.price_level,
    //                             placeDetailData: placeDetailData,
    //                             coordinate: placeDetailData.geometry?.location,
    //                             placeId: details.place_id
    //                         }));
    //                         console.log("Day:", props.dayindex);
    //                         console.log("New Activity:", newActivity);
    //                         addNewActivity(newActivity, props.dayindex, props.activityIndex);
    //                     }
    //                 }

    //                 setIsDataFetched((prev) => !prev);
    //             } catch (err) {
    //                 console.error("Error fetching place details:", err);
    //             }
    //         };

    //         fetchPlaceDetailData();
    //         // isDataFetched = true;
    //     }
    // }, [props.activity.location_name, userUid, cacheKey]);

    const iconDefinition = findIconDefinition({ iconName: props.activity.type });

    const cardDetailClicked = () => {
        if(userUid){
            setOpenDetail((prevState) => !prevState);
        }
    };

    return (
        <div key={props.activityIndex} className="detail pt-6">
            {
                userUid &&  <DetailCard show={openDetail} onClose={cardDetailClicked} placeDetailData={placeDetailData} placeName={placeName} photoURL={photoUrl} />
            }
            <div className="card flex w-full rounded-lg bg-gray-50 p-3">
                <div className="location_description flex">
                    <div className="description">
                        <button 
                            className="font-semibold text-lg hover:underline" 
                            onClick={cardDetailClicked}
                            title={!userUid ? "Please Log-in or Sign-up to see more detail" : ""}
                        >
                            <FontAwesomeIcon icon={iconDefinition} /> - {placeName}
                        </button>
                        <p className="card-description text-slate-500 text-base">{props.activity.description}</p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className="relative w-fit cursor-default items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-3 py-0.5 text-xs md:text-sm">
                            <p className="text-gray-500">{props.activity.duration}</p>
                        </div>
                        <p className="px-3"> • <FontAwesomeIcon icon="fa-solid fa-dollar-sign" /> {price}</p> 
                    </div>
                </div>
                <div className="location_image rounded-lg">
                    {photoUrl && <img src={photoUrl} alt="Place" className="rounded-lg" />}
                </div>
            </div>
        </div>
    );
}

export default Card;
