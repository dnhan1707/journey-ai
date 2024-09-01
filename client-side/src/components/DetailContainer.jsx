import ImageContainer from "./ImageContainer";
import UserInfo from "./UserInfo";
import DisplayCard from "./DisplayCard";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage.jsx";

function DetailContainer({ location }) {
    const [fetchDone, setFetchDone] = useState(false);
    const [fetchImageDone, setFetchImageDone] = useState(false);
    const [fetchCardDataDone, setFetchCardDataDone] = useState(false);

    let planId = localStorage.getItem('currentPlanId');

    if (!planId) {
        planId = uuidv4();
        localStorage.setItem('currentPlanId', planId);
    }

    useEffect(() => {
        if (fetchImageDone && fetchCardDataDone) {
            setFetchDone(true);
        }
    }, [fetchImageDone, fetchCardDataDone]); // Trigger only when either of these changes

    return (
        <>
            {fetchDone ? (
                <div className="detail_container pb-10">
                    <ImageContainer 
                        location={location.state.location} 
                        response={location.state.responseData} 
                        isImageFetched={setFetchImageDone} 
                    />
                    <UserInfo 
                        likeOption={false} 
                        isInSavedDestinationPage={false} 
                        plan_id={planId} 
                    />
                    <DisplayCard 
                        response={location.state.responseData} 
                        onCardDataFetched={setFetchCardDataDone} 
                    />
                </div>
            ) : (
                <LoadingPage />
            )}
        </>
    );
}

export default DetailContainer;
