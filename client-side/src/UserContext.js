import React, { createContext, useContext, useState } from 'react';
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase.js";

// Create a UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userUid, setUserUid] = useState(null);
  const [city, setCity] = useState(null);
  const [duration, setDuration] = useState(null);
  const [tripName, setTripName] = useState(null);
  const [totalEstimation, setTotalEstimation] = useState(null);
  const [itinerary, setItinerary] = useState([]);

  const addNewActivity = (activity, dayIndex, activityIndex) => {
    setItinerary(prevItinerary => {
      const updatedItinerary = [...prevItinerary];
  
      if (dayIndex >= 0 && dayIndex < updatedItinerary.length) {
        // Ensure activities are added at the correct position
        const dayActivities = [...updatedItinerary[dayIndex].activities];
        dayActivities[activityIndex] = activity;
        updatedItinerary[dayIndex].activities = dayActivities;
      }
  
      return updatedItinerary;
    });
  };
  

  // const resetActivity = () => {
  //   setActivities([]);
  // }
  const getSavedPlanCount = async (userUid) => {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const savedPlanCount = userData.saved_plans ? userData.saved_plans.length : 0;
      // console.log(`Number of saved plans for user ${userUid}:`, savedPlanCount);
      return savedPlanCount;
    } else {
        // console.log("No such document!");
        return 0;
    }
  }

  const savePlan = async () => {    
    // console.log("Itinerary that is going to get saved");
    // console.log(itinerary);
    const savedPlanCount = await getSavedPlanCount(userUid);

    const newPlan = {
        city: city,
        duration: duration,
        itinerary: itinerary, // Correctly use the `itinerary` state
        tripname: tripName,
        plan_id: savedPlanCount + 1,
        estimated_total: totalEstimation
    };

    const userRef = doc(db, "users", userUid);

    try { 
      const userDoc = await getDoc(userRef);
      if(!userDoc.exists()){
        // Create a new document if it doesn't exist
        await setDoc(userRef, {
            saved_plans: [newPlan],  // Initialize with the new plan
        });
        // console.log("User document created with new plan");
      } else {
        // Document exists, add new plan to the existing document
        await updateDoc(userRef, {
            saved_plans: arrayUnion(newPlan)
        });
        // console.log("New plan added to existing document");
      }
      // Resetting the states after saving
      setCity(null);
      setDuration(null);
      setTripName(null);
      setTotalEstimation(null);
      setItinerary([]);
      // resetActivity();  // Clear activities after saving the plan
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  }

  return (
    <UserContext.Provider value={{
        userUid, setUserUid,
        city, setCity,
        duration, setDuration,
        tripName, setTripName,
        itinerary, setItinerary,
        totalEstimation, setTotalEstimation,
        addNewActivity, savePlan,
      }}>
        {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
