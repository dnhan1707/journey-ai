import React, { useMemo, useState } from "react";
import { useCombobox } from "downshift";

function LocationInput({ setLocation }) {
    const [searchResult, setSearchResult] = useState({
        autocompleteSuggestions: [],
        status: '',
    });
    const [inputValue, setInputValue] = useState(""); // New state for input value

    // Initialize Google Maps API
    const google = window.google;
    const service = new google.maps.places.AutocompleteService();
    const sessionToken = useMemo(() => new google.maps.places.AutocompleteSessionToken(), []);

    // Use Combobox hook for autocomplete
    const {
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen, // New variable to control the open/close state
    } = useCombobox({
        inputValue,
        items: searchResult.autocompleteSuggestions,
        onInputValueChange: ({ inputValue }) => {
            setInputValue(inputValue);

            //If the input is empty
            if (inputValue === '') {
                setSearchResult({
                    autocompleteSuggestions: [],
                    status: '',                 
                });
                return;
            }

            // Fetch predictions from Google Places API
            service.getPlacePredictions({
                input: inputValue,
                sessionToken: sessionToken,
                types: ['(cities)'], // Filter results to cities
            }, handlePredictions);

            // Handle the predictions response
            function handlePredictions(predictions, status) {
                if (status === "OK") {
                    const autocompleteSuggestions = predictions.map((prediction) => ({
                        id: prediction.place_id,
                        name: {
                            string: prediction.structured_formatting.main_text,
                        },
                        address: {
                            string: prediction.structured_formatting.secondary_text,
                        },
                    }));
                    setSearchResult({
                        autocompleteSuggestions: autocompleteSuggestions,
                        status: 'OK',
                    });
                } else {
                    setSearchResult({
                        autocompleteSuggestions: [],
                        status: status,
                    });
                }
            }
        },
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem) {
                handleChooseLocation(selectedItem.address.string);
            }
        }
    });

    const handleChooseLocation = (location) => {
        setLocation(location);
        setInputValue(location); // Update the input field with the selected location
        setSearchResult({
            autocompleteSuggestions: [],
            status: '',
        }); // Clear the suggestions
    };

    return (
        <>  
            <input 
                type="search"
                {...getInputProps({
                    className: "block w-full p-3 ps-12 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500",
                })}
            />
            {
                isOpen && searchResult.autocompleteSuggestions.length > 0 &&
                <ul
                    {...getMenuProps()}
                    className="absolute w-2/5 h-64 bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50 border-gray-300 pb-5"
                >
                    {searchResult.autocompleteSuggestions.map((item, index) => (
                        <li
                            key={item.id}
                            {...getItemProps({ item, index })}
                            className="p-3 border-b border-gray-200 hover:bg-blue-500 hover:text-white cursor-pointer"
                            onClick={() => handleChooseLocation(item.name.string + ", " + item.address.string)}
                        >
                            <p className="font-semibold">{item.name.string}</p>
                            <p className="text-sm text-gray-500">{item.address.string}</p>
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}

export default LocationInput;
