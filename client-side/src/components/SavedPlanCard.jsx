import FetchImage from "./FetchImage.js"
import "../css/SavedPlanCard.css"
import { useNavigate } from "react-router-dom";

function SavedPlanCard({tripname, city, days, userId, planId, saved_plans_data}){
    const navigate = useNavigate()

    const handleCardClicked = () => {
        navigate(`/saved_plans/destination`, {state: {saved_plans: saved_plans_data, plan_id: planId, from: "/saved_plans/destination"}});
    }

    return (
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
            </div>
            
        </div>
    )
}

export default SavedPlanCard;
