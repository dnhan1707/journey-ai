import ImageContainer from "./ImageContainer";
import UserInfo from "./UserInfo";
import DisplayCard from "./DisplayCard";
import { v4 as uuidv4 } from 'uuid';
// import DaysNavBar from "./DaysNavBar";

function DetailContainer({location}){
    const planId = uuidv4();
    return (

        <div className="detail_container pb-10">
            {/* <DaysNavBar/> */}
            <ImageContainer location={location.state.location} response={location.state.responseData}/>
            <UserInfo likeOption={false} isInSavedDestinationPage={false} plan_id={planId}/>
            <DisplayCard response={location.state.responseData}/>
        </div>
    )
}

export default DetailContainer;
