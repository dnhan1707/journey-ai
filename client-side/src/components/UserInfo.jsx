import "../css/UserInfo.css";
import { useState, useCallback } from "react";
import { useUser } from "../UserContext.js";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import usePersistState from "../usePersistState";

function UserInfo({ likeOption, isInSavedDestinationPage, plan_id }) {
    const currentDate = new Date();
    const { savePlan, userUid } = useUser();
    const [openSnackBar, setOpenSnackBar] = useState(false);

    // Initialize state based on either likeOption or localStorage
    if(!isInSavedDestinationPage){
        const [liked, setLiked] = usePersistState(likeOption, `liked_${plan_id}`);  
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    // Handle like button click
    const clickLike = useCallback(() => {
        if (!userUid) {
            setOpenSnackBar(true);
            return;
        }

        const newLikedState = !liked;
        setLiked(newLikedState);

        // Save the liked state to localStorage with a plan-specific key
        // localStorage.setItem(`liked_${planId}`, JSON.stringify(newLikedState));

        if (newLikedState) {
            savePlan();
            console.log("Plan saved to cloud");
        } else {
            console.log("Activity removed from the list");
        }
    }, [liked, savePlan, userUid]);

    // Date formatting options
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

    return (
        <>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please login or signup to save the itinerary.
                </Alert>
            </Snackbar>

            <div className="post_info">
                <div className="user_info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>

                    <div className="user_name_date">
                        <p>User</p>
                        <p>{formattedDate}</p>
                    </div>
                </div>

                <div className="like_info">
                    <button
                        onClick={clickLike}
                        title={!userUid ? "You must be logged in to save the plan" : ""}
                    >
                        {
                            isInSavedDestinationPage &&
                            <i className={'fa-heart fa-solid text-red-500 text-2xl'}></i>
                        }
                        {
                            userUid && 
                            <i className={`fa-heart ${liked ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'} text-2xl`}></i>
                        }
                        {
                            !userUid && 
                            <i className="fa-regular fa-heart text-gray-500 text-2xl"></i>
                        }
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserInfo;
