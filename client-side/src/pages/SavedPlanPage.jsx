import React, { useEffect, useState } from 'react';
import SavedPlanCard from "../components/SavedPlanCard.jsx";
import Header from "../components/Header.jsx";
import { useUser } from '../UserContext.js';

function SavedPlanPage() {
  const [savedPlan, setSavedPlan] = useState(null);
  const [planIds, setPlanIds] = useState([]);
  const { userUid, getSavedPlans } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSavedPlans();

      setSavedPlan(data);
      setPlanIds(Object.keys(data)); // Set planIds with the keys of the savedPlan object
    };

    fetchData();
  }, [userUid]);

  const handleRemove = (planId) => {
    setSavedPlan((prevSavedPlan) => {
      const updatedSavedPlan = {...prevSavedPlan};
      delete updatedSavedPlan[planId];
      return updatedSavedPlan;
    })
    setPlanIds((prevPlanIds) => prevPlanIds.filter((id) => id !== planId))
  }


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
            {
              savedPlan && planIds.map((planId) => {
                const plan = savedPlan[planId];
                if (!plan) return null;

                return (
                  <SavedPlanCard
                    tripname={plan.tripName}
                    city={plan.city}
                    days={plan.duration}
                    planId={planId}
                    onRemove={handleRemove}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </>

  );
}

export default SavedPlanPage;
