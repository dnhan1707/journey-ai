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
                setPlaceName(props.activity.location_name);
                setPhotoUrl(props.activity.place_detail.photo_url);
                setPrice(props.activity.place_detail.price_level);
                setIsDataFetched(true); // Mark data as fetched
                console.log("Detail: ", props.activity.place_detail);
                console.log("Photo url: ", props.activity.place_detail.photo_url);
            } catch (err) {
                console.error("Error fetching place details:", err);
            }
        };

        fetchPlaceDetailData();
    }, [props.activity.location_name, isDataFetched]);

    const iconDefinition = findIconDefinition({ iconName: props.activity.type });

    const cardDetailClicked = () => {
        setOpenDetail((prevState) => !prevState);
    };

    return (
        <div key={props.activityIndex} className="detail pt-6">
            <DetailCard show={openDetail} onClose={cardDetailClicked} placeId={placeId} placeName={placeName} photoURL={photoUrl} placeDetailDataFromDb={props.activity.place_detail}/>
            <div className="card flex w-full rounded-lg bg-gray-50 p-3">
                <div className="location_description flex">
                    <div className="description">
                        <button className="font-semibold text-lg" onClick={cardDetailClicked}>
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

export default GenerateDestinationCard;
