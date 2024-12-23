import { useEffect, useState } from "react";

function LocationInput({ setLocation }) {
    const [placePredictions, setPlacePredictions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const apiKey = process.env.REACT_APP_GG_PLACE_KEY;
    if(!apiKey){
        console.error("Google API key not defined");
    }

    const displaceSuggestions = (predictions, status) => {
        if(status !== "OK"){
            console.error("Failed to get predictions", status);
            return;
        }
        setPlacePredictions(predictions);
        // console.log(predictions);
    }

    const initializeAutocomplete = (input) => {
        const google = window.google;
        if(window.google){
            const service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions(
                { input: input, types: ["(cities)"] }, 
                displaceSuggestions
            );  
        }
    }

    const handleChange = (event) => {
        // console.log(event.target.value);
        if(event.target.value === ""){
            setPlacePredictions([]);
            setSelectedPlace(null);
            setLocation(null);
            return;
        }
        initializeAutocomplete(event.target.value);
        setLocation(event.target.value);
    };


    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;  
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }

        if(!window.google){
            loadGoogleMapsScript();
        }
    }, [apiKey, setLocation]);

    return (
        <div className="flex-1">
            <form className="w-full h-full">
                <label htmlFor="search"
                       className="mb-0.5 text-sm font-medium text-black sr-only dark:text-white">Your destination</label>

                <div className="flex justify-center h-full">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                           <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                     stroke-width="2"
                                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                           </svg>
                        </div>
                        <input
                            type="search"
                            id="autocompletesearch"
                            onChange={ handleChange }
                            className="block w-full p-3 ps-12 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 h-full"
                            placeholder="Your destination"
                            value={selectedPlace}
                            required
                        />
                        {placePredictions.length > 0 && (
                            <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50 border-gray-300">
                                {placePredictions.map((prediction, index) => (
                                    <li
                                        key={index}
                                        className="p-3 border-b border-gray-200 hover:bg-blue-500 hover:text-white cursor-pointer"
                                        onClick={() => {
                                            setLocation(prediction.description);
                                            setSelectedPlace(prediction.description);
                                            setPlacePredictions([]);
                                        }}
                                    >
                                        <p>{prediction.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LocationInput;