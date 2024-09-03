import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from './components/Auth/LogInPage.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.js';
import { ProtectedrRoutes } from './components/ProtectedRoutes.jsx';
import LoadingPage from './components/LoadingPage.jsx';
import MainPage from './pages/MainPage.jsx';
import "./index.css";
import SavedPlanPage from './pages/SavedPlanPage.jsx';
import GenerateDestinationPage from './pages/GenerateDestinationPage.js';
import GenerateMap from './pages/GenerateMap.js';
import { useUser } from './UserContext.js';
import DonationPage from './pages/DonationPage.js'

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { setUserUid } = useUser(); // Destructure setUserUid from the context

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        setUserUid(user.uid); 
      } else {
        setUser(null);
        setIsFetching(false);
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, [setUserUid]);

  if (isFetching) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/login' element={<LogInPage user={user} />} />
        <Route path='/donation' element={<DonationPage/>}/>
        <Route path='/' element={<MainPage />}/>
        <Route path='/destination' element={<GenerateMap/>} />

        {/* Protected Routes */}
        <Route path='/saved_plans' element={
          <ProtectedrRoutes user={user}>
            <SavedPlanPage />
          </ProtectedrRoutes>
        } />
        <Route path='/saved_plans/destination' element={
          <ProtectedrRoutes user={user}>
            <GenerateDestinationPage />
          </ProtectedrRoutes>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
