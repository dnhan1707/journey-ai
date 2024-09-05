import { useState } from 'react';
import SignOutButton from "./Auth/SignOutButton";
import { useNavigate } from "react-router-dom";
import SignInButton from "./Auth/SignInButton";
import { useUser } from "../UserContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

function Header() {
  const navigate = useNavigate();
  const { userUid } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const navigateToSavePlanPage = () => {
    navigate('/saved_plans');
  };

  const navigateToDonatePage = () => {
    navigate('/donation');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header flex flex-row h-16 justify-between items-center px-4 md:px-10 bg-white shadow-md">
      {/* Logo */}
      <div className="icon flex items-center h-full">
        <a href="/"><img className="logo-orange" src={"logo-orange.png"} alt="journeyAI Icon" /></a>
      </div>

      {/* Menu for larger screens */}
      <div className="hidden md:flex flex-row gap-7 items-center h-full">
        {userUid && (
          <div className="flex items-center gap-5">
            <button className="flex items-center" onClick={navigateToDonatePage}>
              <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />
              <span className="ml-2 text-gray-600">Buy me a coffee?</span>
            </button>
            <button className="flex items-center" onClick={navigateToSavePlanPage}>
              <FontAwesomeIcon icon="fa-solid fa-box-archive" />
              <span className="ml-2 text-gray-600">Saved Plan</span>
            </button>
            <SignOutButton />
          </div>
        )}

        {!userUid && (
          <div className="flex items-center gap-5">
            <button className="flex items-center" onClick={navigateToDonatePage}>
              <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />
              <span className="ml-2 text-gray-600">Buy me a coffee?</span>
            </button>
            <SignInButton />
          </div>
        )}
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <FontAwesomeIcon icon="fa-solid fa-bars" className="text-xl" />
        </button>
      </div>

      {/* Dropdown menu for small screens */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg py-4 px-6 z-50 md:hidden">
          {userUid && (
            <div className="flex flex-col gap-4">
              <button className="flex items-center" onClick={navigateToDonatePage}>
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />
                <span className="ml-2 text-gray-600">Buy me a coffee?</span>
              </button>
              <button className="flex items-center" onClick={navigateToSavePlanPage}>
                <FontAwesomeIcon icon="fa-solid fa-box-archive" />
                <span className="ml-2 text-gray-600">Saved Plan</span>
              </button>
              <SignOutButton />
            </div>
          )}

          {!userUid && (
            <div className="flex flex-col gap-4">
              <button className="flex items-center" onClick={navigateToDonatePage}>
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />
                <span className="ml-2 text-gray-600">Buy me a coffee?</span>
              </button>
              <SignInButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
