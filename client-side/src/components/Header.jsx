import SignOutButton from "./Auth/SignOutButton";
import { useNavigate } from "react-router-dom";
import SignInButton from "./Auth/SignInButton";
import { useUser } from "../UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

function Header(){
    const navigate = useNavigate();
    const { userUid } = useUser();

    const navigateToSavePlanPage = () => {
        navigate('/saved_plans');
    }
    
    return(
        <div className="header flex flex-row h-10 justify-between items-center">
            <div className="icon flex items-center h-full">
                <a href="/"><img className="logo-orange" src={"logo-orange.png"} alt='journeyAI Icon'/></a>
            </div>

            <div className="flex flex-row gap-7 pr-10 items-center h-full">
                {
                    userUid && 
                    <div className="flex items-center gap-5">
                        <button className="flex items-center" onClick={navigateToSavePlanPage}>
                            <FontAwesomeIcon icon="fa-solid fa-box-archive" />
                            <span className="ml-2 text-gray-600">Saved Plan</span>
                        </button>
                        <SignOutButton></SignOutButton>
                    </div>  
                }

                {
                    !userUid && 
                    <div className="flex items-center">
                        <SignInButton></SignInButton>
                    </div>
                }

            </div>
        </div>


    )
}

export default Header;