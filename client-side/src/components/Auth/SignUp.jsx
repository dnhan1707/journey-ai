import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useUser } from "../../UserContext";

function SignUp({ open, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false);
    const { handleUserSignUp } = useUser();

    if (!open) {
        return null;
    }

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevents form submission and page reload
        if (!email || !password) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                handleUserSignUp(user.uid); // Create a new user profile
                onClose(); // Close the modal
                setRedirectToHome(true); // Trigger redirect to homepage
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage);
            });
    };

    if (redirectToHome) {
        return <Navigate to={'/homepage'} />;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
                <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Sign Up</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                    <input
                        type="email"
                        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-orange-500"
                        name="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-orange-500"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg w-full mt-4" type="submit">
                        Sign Up
                    </button>
                </form>
                <button 
                    className="mt-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SignUp;
