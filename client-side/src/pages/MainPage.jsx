import '../css/MainPage.css';
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationInput from '../components/LocationInput.jsx';
import GeminiResponse from '../components/GeminiResponse.jsx';
import PeopleCount from '../components/PeopleCount.jsx';
import DayCount from "../components/DayCount.jsx";
import journeyCmd from "../components/prompt.jsx";
import LoadingPage from "../components/LoadingPage.jsx";
import CustomizeOptions from "../components/CustomizeOptions.jsx";
import Header from "../components/Header.jsx";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import TestingComponent from "../pages/TestingPage.js";

function MainPage() {
    const [location, setLocation] = useState(null);
    const [numOfPeople, setNumOfPeople] = useState(null);
    const [command, setCommand] = useState(null);
    const [day, setDay] = useState(null);
    const [theme, setTheme] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [openCustomizeBox, setOpenCustomizeBox] = useState(false);
    const [specialRequest, setSpecialRequest] = useState(null);
    const [budget, setBudget] = useState("Mid");
    const [error, setError] = useState(null);
    const [openSnackBar, setopenSnackBar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // console.log("handleSubmit called"); // Debug log
        if (!location) {
            setError("Please input the location");
            setopenSnackBar(true);
            return;
        }

        localStorage.removeItem('currentPlanId');
        const prompt = journeyCmd(location, numOfPeople, day, theme, specialRequest, budget);
        // console.log("Generated Command:", prompt); // Debug log
        setCommand(prompt);
        // console.log("Command set:", prompt); // Debug log
        setLoading(true);
    };

    const handleResponse = (data) => {
        //reset
        // console.log("Command before reset: ", command);
        setCommand(null);
        setNumOfPeople(null);
        setDay(null);
        setTheme(null);
        setSpecialRequest(null);
        setLoading(false);

        setResponseData(data);
    };

    const handleOpenCustomizeBox = () => {
        setOpenCustomizeBox((prevState) => !prevState);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setopenSnackBar(false);
    };

    useEffect(() => {
        if (responseData) {
            // console.log("Response Data: ", responseData);
            navigate('/destination', { state: { location: location, responseData: responseData } });
        }
    }, [responseData]);

    return (
        <>
            <Header />

            {/* Loading page */}
            {isLoading && <LoadingPage />}

            {/* Handle when open customize option */}
            {openCustomizeBox && (
                <CustomizeOptions show={openCustomizeBox} onClose={handleOpenCustomizeBox} setTheme={setTheme} setSpecialRequest={setSpecialRequest} setBudget={setBudget} />
            )}

            {!isLoading && (
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
                            {error}
                        </Alert>
                    </Snackbar>

                    <div id="command">
                        {/* The title */}
                        <div className="text-center landing-margin">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Plan your trip in one click</h1>
                            <p className="mx-4 mt-6 text-xs leading-4 text-gray-600 sm:text-base">Let us help you generate the perfect plan for the trip by simply entering your destination, number of travelers, and days.</p>
                            <img className="landing-icon" src={"notion-icon.png"} alt='journeyAI Icon' />
                        </div>

                        <div className="flex items-center justify-center">
                            {/* Location Input */}
                            <div className="w-1/2 max-w-lg mx-2">
                                <LocationInput setLocation={setLocation} />
                            </div>

                            {/* Customize button */}
                            <div className="flex-shrink-0 mx-2">
                                <button className="bg-orange-500 p-3 ring-orange-500 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-white text-white"
                                    onClick={handleOpenCustomizeBox}
                                >
                                    Personalize
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Set number of days and people */}
                        <div className={"trip-options"}>
                            <div className={"mx-10"}>
                                <PeopleCount setNumOfPeople={setNumOfPeople} />
                            </div>
                            <div className={"mx-10"}>
                                <DayCount setNumberOfDay={setDay} />
                            </div>
                        </div>

                        {/* Button to generate plan from input value */}
                        <div className={"flex justify-center"}>
                            <button
                                className={"bg-gray-800 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded flex flex-col mb-4"}
                                onClick={handleSubmit}>Generate Plan
                            </button>
                        </div>
                    </div>
                </>
            )}
            {/* Only ask Gemini when the prompt is ready */}
            {
                command && (
                    <div className={"mx-20 flex justify-center"}>
                        <GeminiResponse command={command} onDataReceived={handleResponse} setLoading={setLoading} />
                    </div>
                )
            }
        </>
    );
}

export default MainPage;