import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'; // Import the desired icon

function SpecialRequest({ setSpecialRequest }) {
    const handleChange = (event) => {
        setSpecialRequest(event.target.value);
    };

    return (
        <div className="flex-1 text-sm relative">
            {/* <FontAwesomeIcon 
                icon={faWandMagicSparkles} 
                className="absolute inset-y-0 left-3 flex items-center pointer-events-none" 
            /> */}
            <input
                type='search'
                onChange={handleChange}
                className="block max-h-60 p-2 pl-10 border border-gray-300 rounded-lg w-full h-full"
                placeholder="Tell us more about your reference"
            />
        </div>
    );
}

export default SpecialRequest;