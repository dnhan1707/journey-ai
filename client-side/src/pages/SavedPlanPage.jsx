import React, { useEffect, useState } from 'react';
import SavedPlanCard from "../components/SavedPlanCard.jsx";
import Header from "../components/Header.jsx";
import { db } from '../firebase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '../UserContext.js';

function SavedPlanPage() {
  const [savedPlan, setSavedPlan] = useState(null);
  const { userUid } = useUser();

  // Function to fetch user's saved plans by userId
  const fetchUserSavedPlansById = async (userId) => {
    try {
      // Reference to the user's document
      const userDocRef = doc(db, "users", userId);
      
      // Fetch the document
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Document data
        // console.log("User Uid", userId);
        // console.log("User Data:", userDoc.data().saved_plans);
        return userDoc.data();
      } else {
        // console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const FirebaseuserID = userUid; // Should be a string to match your server logic
      const data = await fetchUserSavedPlansById(FirebaseuserID);
      setSavedPlan(data);
    };

    fetchData();
  }, [userUid]);

  // if (savedPlan === null) {
  //   return <p>Loading...</p>; // Show a loading state while data is being fetched
  // }

  // if (savedPlan && !savedPlan.saved_plans) {
  //   return <p>No saved plans found.</p>; // Display a message if no saved plans exist
  // }

  return (
    <>
      <Header></Header>
      <div className='flex flex-col pt-10 justify-center'>
        <div className='flex flex-col pt-36'>
          <div className='flex flex-col'>
            <div className='flex text-4xl tracking-tight text-gray-900 sm:text-4xl justify-center'>
              Saved Plans
            </div>

            <div className='flex justify-center'>
              <p className='text-gray-900 tracking-tight pt-2'>Find your previous itinerary here</p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto max-w-screen-lg py-20'>
            {savedPlan?.saved_plans?.map(plan => (
              <div key={plan.plan_id}>
                <SavedPlanCard
                  tripname={plan.tripname}
                  city={plan.city}
                  days={plan.duration}
                  userId={userUid}
                  planId={plan.plan_id}
                  saved_plans_data={savedPlan.saved_plans}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}

export default SavedPlanPage;
