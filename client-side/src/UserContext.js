import React, { createContext, useContext, useState } from 'react';
import { doc, getDoc, getDocs, setDoc, serverTimestamp, collection, deleteDoc } from "firebase/firestore";
import { db } from "./firebase/firebase.js";

// Create a UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userUid, setUserUid] = useState(null);
  const [planToSave, setPlanToSave] = useState(null);
  const [planIdJustSaved, setPlanIdJustSaved] = useState(null);

  const creatNewProfile = async (newUserId) => {
    const userRef = collection(db, "users", newUserId, "profile");
    const newProfileRef = doc(userRef, "user_info");
    await setDoc(newProfileRef, { username: "User"})
  };

  const handleUserSignUp = (newUserId) => {
    setUserUid(newUserId);
    creatNewProfile(newUserId);
  };

  const getUserName = async () => {
    const userRef = doc(db, "users", userUid, "profile", "user_info");
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().username;
    } else {
      return "User";
    }
  }

  const updateUserName = async (newName) => {
    const userRef = doc(db, "users", userUid, "profile", "user_info");
    await setDoc(userRef, { username: newName });
  }


  // Save a plan to the user's saved plans collection
  const savePlan = async () => {
    if (!userUid || !planToSave) {
      console.error("User UID or plan to save is missing");
      return;
    }

    const savedPlansRef = collection(db, "users", userUid, "saved_plans");
    const newPlanRef = doc(savedPlansRef);

    try {
      await setDoc(newPlanRef, { ...planToSave, timestamp: serverTimestamp() });
      // console.log("plan id just save: ", newPlanRef.id);
      setPlanIdJustSaved(newPlanRef.id);
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  // Get all saved plans for the user
  const getSavedPlans = async () => {
    if (!userUid) {
      console.error("User UID is missing");
      return {};
    }

    const savedPlansRef = collection(db, "users", userUid, "saved_plans");

    try {
      const querySnapshot = await getDocs(savedPlansRef);
      const plans = querySnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data();
        return acc;
      }, {});

      return plans;
    } catch (error) {
      console.error("Error getting saved plans:", error);
      return {};
    }
  };

  // Get a specific plan by its ID
  const getPlanById = async (planId) => {
    if (!userUid || !planId) {
      console.error("User UID or plan ID is missing");
      return null;
    }

    const planRef = doc(db, "users", userUid, "saved_plans", planId);

    try {
      const planDoc = await getDoc(planRef);
      if (planDoc.exists()) {
        return planDoc.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting plan by ID:", error);
      return null;
    }
  };

  // Get all saved plan IDs for the user
  const getSavedPlanId = async () => {
    if (!userUid) {
      console.error("User UID is missing");
      return [];
    }

    const savedPlansRef = collection(db, "users", userUid, "saved_plans");

    try {
      const querySnapshot = await getDocs(savedPlansRef);
      return querySnapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error("Error getting saved plan IDs:", error);
      return [];
    }
  };

  // Remove a specific plan by its ID
  const removePlan = async (planId) => {
    if (!userUid) {
      console.error("User UID is missing");
      return;
    }

    if(!planId){
      console.error("Plan ID is missing");
      return;
    }

    const planRef = doc(db, "users", userUid, "saved_plans", planId);

    try {
      await deleteDoc(planRef);
    } catch (error) {
      console.error("Error removing plan:", error);
    }
  };

  return (
    <UserContext.Provider value={{
      userUid, setUserUid,
      planToSave, setPlanToSave,
      planIdJustSaved, setPlanIdJustSaved,
      savePlan, getSavedPlans, getSavedPlanId, removePlan, getPlanById,
      creatNewProfile, handleUserSignUp, getUserName, updateUserName
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};