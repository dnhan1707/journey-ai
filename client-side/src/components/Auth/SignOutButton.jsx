import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function SignOutButton(){
    const handleSignOut = () => {
        signOut(auth)
        .then(() =>console.log("Sign out"))
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <button onClick={handleSignOut}
            ><i className="fa-solid fa-user"></i>
                <span className="text-gray-600"> Sign Out</span>
            </button>
        </div>
    )
}

export default SignOutButton;
