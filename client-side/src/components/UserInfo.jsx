import "../css/UserInfo.css";
import { useState, useCallback, useEffect } from "react";
import { useUser } from "../UserContext.js";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import usePersistState from "../usePersistState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons'; //has to directly import 
import { faHeart as voidHeart } from '@fortawesome/free-regular-svg-icons';

function UserInfo({ likeOption, isInSavedDestinationPage, plan_id }) {
    const currentDate = new Date();
    const { savePlan, userUid, planIdJustSaved, removePlan, getUserName, updateUserName } = useUser();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [liked, setLiked] = usePersistState(likeOption, `liked_${plan_id}`);  
    const [userName, setUserName] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserName = async () => {
            if(userUid) {
                const name = await getUserName();
                setUserName(name);
            }
        }
        fetchUserName();
    }, [userUid, getUserName]);

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleNameSubmit = (e) => {
        // e.preventDefault();
        updateUserName(userName);
        setIsEditing(false);
    };

    const handleIconClick = () => {
        if(!userUid) {
            setOpenSnackBar(true);
            return;
        }
        setIsEditing(true);
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
            // console.log("Plan saved to cloud");
        } else {            
            removePlan(planIdJustSaved);
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
                    Please login or signup to save the itinerary and edit user profile.
                </Alert>
            </Snackbar>

            <div className="post_info">
                <div className="user_info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>

                    <div className="user_name_date">
                        <div className="flex items-center">
                            {isEditing ? (
                                <>
                                    <input 
                                        type="text" 
                                        value={userName} 
                                        onChange={handleNameChange} 
                                        onBlur={handleNameSubmit}
                                        className="border-b-2 border-gray-300 focus:outline-none focus:border-orange-500"
                                    />
                                    <button onClick={handleNameSubmit} className="ml-2 text-orange-500">Save</button>
                                </>
                            ) : (
                                <>
                                    <p className="mr-4">{userName}</p>
                                    <FontAwesomeIcon icon="fa-regular fa-pen-to-square" onClick={handleIconClick} className="cursor-pointer" />
                                </>
                            )}
                        </div>
                        <p>{formattedDate}</p>
                    </div>
                </div>

                <div className="like_info">
                    <button
                        onClick={clickLike}
                        title={!userUid ? "You must be logged in to save the plan" : ""}
                        disabled={isInSavedDestinationPage}  // Disable button if on saved destination page
                        className={`${isInSavedDestinationPage ? 'cursor-not-allowed opacity-50' : ''}`}  // Optionally add styles for disabled state
                    >
                    {
                        isInSavedDestinationPage ? (
                            <FontAwesomeIcon icon={filledHeart} className="text-red-500 text-2xl" />
                        ) : userUid ? (
                            <FontAwesomeIcon icon={liked ? filledHeart : voidHeart} className= {`text-2xl" ${liked ? 'text-red-500' : 'text-gray-500'}`}/>
                        ) : (
                            <FontAwesomeIcon icon={voidHeart} className="text-red-500 text-2xl"/>
                        )
                    }     
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserInfo;
