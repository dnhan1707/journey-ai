// import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Destination.css"


function BackBtn(){
    const navigate = useNavigate();
    const location = useLocation();


    const goBack = () =>{
        if(location.state.from === "/saved_plans/destination"){
           navigate("/saved_plans"); 
        } else {
            navigate("/")
        }
        
    }

    return (
        <div className="absolute pt-6 pl-10 rounded-xl back-button">
            <button className="flex items-center p-1 bg-black bg-opacity-65 dark:text-white rounded-lg p-2" onClick={goBack}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg>
                back
            </button>
        </div>
    )
}

export default BackBtn;