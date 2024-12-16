import FetchImage from "./FetchImage.js"
import "../css/SavedPlanCard.css"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../UserContext.js";
import { useState } from "react";


function SavedPlanCard({tripname, city, days, planId, onRemove}){
    const { removePlan } = useUser();
    const [wantRemove, setWantRemove] = useState(false);

    const navigate = useNavigate()

    const handleCardClicked = () => {
        navigate(`/saved_plans/destination`, {state: {plan_id: planId, from: "/saved_plans/destination"}});
    }

    const onClose = () => {
        setWantRemove(false);
    }

    const handleRemove = () => {
        removePlan(planId);
        setWantRemove(false);
        onRemove(planId);
    }

    const openRemoveOption = (e) => {
        e.stopPropagation();
        setWantRemove(true);
    }

    return (
        <>  
            {wantRemove && 
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
                        ></div>
    
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10 overflow-y-auto h-4/5 max-h-[80vh] justify-center"
                            onClick={(e) => e.stopPropagation()}>
                            <div>
                                <h1 className="flex justify-center">Are you sure you want to delete this plan forever?</h1>
                                <div className="flex flex-between justify-center gap-10">
                                    <button className="remove-option" onClick={handleRemove}>Yes</button>
                                    <button className="remove-option" onClick={onClose}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="flex flex-col w-52">
                <FetchImage className="rounded-t-lg" query={city}/>

                <div class="card1 rounded-b-lg" onClick={handleCardClicked}>
                    <h3>{tripname}</h3>
                    <p class="small">{days} days</p>
                    <div class="go-corner" href="#">
                        <div class="go-arrow">
                        →
                        </div>  
                    </div>
                    <button className="trash-button" onClick={openRemoveOption}>
                        <FontAwesomeIcon icon="fa-solid fa-trash" className="trash-icon" />
                    </button>            
                </div>
            </div>
        </>

    )
}

export default SavedPlanCard;
