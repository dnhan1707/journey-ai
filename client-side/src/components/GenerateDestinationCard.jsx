import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import "../css/Card.css";
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import DetailCard from './DetailCard.jsx';

library.add(fas, far, fab);

function GenerateDestinationCard(props) {
    const [placeName, setPlaceName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [price, setPrice] = useState('');
    const [openDetail, setOpenDetail] = useState(false);
    const [placeId, setPlaceId] = useState('');
    const [isDataFetched, setIsDataFetched] = useState(false); // New state for caching

    useEffect(() => {
        if (isDataFetched) return; // Skip if data is already fetched

        const fetchPlaceDetailData = async () => {
            try {
                setPlaceId(props.activity.place_detail.place_id);
                setPlaceName(props.activity.name);
                setPhotoUrl(props.activity.place_detail.photo_url);
                setPrice(props.activity.place_detail.price_level);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching place details:", err);
            }
        };

        fetchPlaceDetailData();
    }, [props.activity.name, isDataFetched]);

    const iconDefinition = findIconDefinition({ iconName: props.activity.type });

    const cardDetailClicked = () => {
        setOpenDetail((prevState) => !prevState);
    };

    return (
        <div key={props.activityIndex} className="detail pt-6">
            <DetailCard show={openDetail} onClose={cardDetailClicked} placeId={placeId} placeName={placeName} photoURL={photoUrl} placeDetailDataFromDb={props.activity.place_detail}/>
            <div 
                className="card flex w-full rounded-lg bg-gray-50 p-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100"
                onClick={cardDetailClicked}
                >
                <div className="location_description flex">
                    <div className="description">
                        <button 
                            className="font-semibold text-lg  focus:outline-none transition-colors duration-200 hover:text-orange-600"
                            onClick={cardDetailClicked}
                        >
                            <FontAwesomeIcon icon={iconDefinition} /> - {props.activity.name}
                        </button>
                        <p className="card-description w-5/6 text-slate-500 text-base mt-1">{props.activity.description}</p>
                    </div>
                    <div className='flex flex-row items-center mt-2'>
                        <div className="relative w-fit cursor-default items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-3 py-0.5 text-xs md:text-sm shadow-sm transition-shadow duration-200 hover:shadow-md">
                            <p className="text-gray-500">{props.activity.duration}</p>
                        </div>
                        <p className="px-3"> • <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />{props.activity.price_level}</p> 
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
    );
}

export default GenerateDestinationCard;
