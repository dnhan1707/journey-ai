import ImageContainer from "./ImageContainer";
import UserInfo from "./UserInfo";
import DisplayCard from "./DisplayCard";
// import DaysNavBar from "./DaysNavBar";

function DetailContainer({location}){
    return (

        <div className="detail_container pb-10">
            {/* <DaysNavBar/> */}
            <ImageContainer location={location.state.location} response={location.state.responseData}/>
            <UserInfo likeOption={false}/>
            <DisplayCard response={location.state.responseData}/>
        </div>
    )
}

export default DetailContainer;
