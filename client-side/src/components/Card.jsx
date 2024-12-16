import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css/Card.css";
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import DetailCard from './DetailCard.jsx';
import default_pic from "../pictures/man_walking.jpg"

function Card(props) {
    const [openDetail, setOpenDetail] = useState(false);
    const [placeDetailData, setPlaceDetailData] = useState(props.activity.place_detail);
    const [photoUrl, setPhotoUrl] = useState(props.activity.place_detail.photo_url);

    const iconDefinition = findIconDefinition({ iconName: props.activity.type });
    
    const cardDetailClicked = () => {
        setOpenDetail((prevState) => !prevState);
    };

    return (
        <>   
            <div key={props.activityIndex} className="detail pt-6">
                <DetailCard
                    show={openDetail}
                    onClose={cardDetailClicked}
                    placeDetailData={placeDetailData}
                    placeName={props.activity.name}
                    photoURL={photoUrl !== "Not Found" ? photoUrl : default_pic}
                />
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
                                <FontAwesomeIcon icon={iconDefinition} className="mr-2" /> {props.activity.name}
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
                                src={photoUrl !== "Not Found" ? photoUrl : default_pic}
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