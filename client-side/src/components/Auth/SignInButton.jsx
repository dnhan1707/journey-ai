import { useNavigate } from "react-router-dom";

function SignInButton(){
    const navigate = useNavigate();

    const navigateToLoginPage = () => {
        navigate('/login');
    }

    return (
        <div>
            <button className="flex items-center" onClick={navigateToLoginPage}>
                <span className="ml-2 text-gray-600"><i className="fa-solid fa-user"></i>{'  '}Log-in / Sign-up</span>
            </button>
        </div>
    )
}

export default SignInButton;
