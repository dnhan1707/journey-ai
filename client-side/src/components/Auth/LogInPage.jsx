import { Navigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import login_background from '../../pictures/login_background.png';

import SignUp from "./SignUp.jsx";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

library.add(fas, fab);
const provider = new GoogleAuthProvider()

function LogInPage({ user }) {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openSignUpForm, setOpenSignUpForm] = useState(false);
    const [isSigningIn, setSigningIn] = useState(true);

    if (user) {
        return <Navigate to={'/'} />;
    }

    const handleSigninWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // Handle result (user, token) securely
            // e.g., securely send the token to your backend if necessary
        }).catch((error) => {
            // Avoid logging error details in production
            console.error("Google sign-in failed.");
            setError("Login with Google failed. Please try again.");
        });
    }

    const handleSignUp = () => {    
        setOpenSignUpForm((prevState) => !prevState);
        setSigningIn((prevState) => !prevState);
    };

    const handleSignIn = (e) => {
        e.preventDefault(); 
        if (!email || !password) {
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
            })
            .catch((error) => {
                // Avoid logging sensitive information
                console.error("Login failed."); // Generic log for debugging
                setError("Login failed. Please check your credentials and try again.");
            });
    };

    return (
        <div style={{
            backgroundImage: `url(${login_background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>  
            {openSignUpForm && 
                <SignUp open={openSignUpForm} onClose={handleSignUp} />
            }
            {isSigningIn && 
                <div className="flex justify-center items-center min-h-screen p-4">
                    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
                        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Login</h2>

                        <div className="flex flex-col gap-4">
                            <button 
                                className="flex items-center justify-center w-full p-3 border-2 rounded-lg text-gray-600 hover:bg-gray-100"
                                onClick={handleSigninWithGoogle}
                                disabled
                                >
                                <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
                                Login with Google
                            </button>

                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300" />
                                <span className="mx-3 text-gray-500">or</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
                                {error && <div className="text-red-500 text-center">{error} <FontAwesomeIcon icon="fa-regular fa-face-rolling-eyes" /></div>}

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
                                    Log in
                                </button>

                                <div className="mt-6 text-center text-gray-500">
                                    Don't have an account? 
                                    <button 
                                    className="text-orange-500 hover:text-orange-600 ml-1 font-semibold"
                                    onClick={handleSignUp}
                                    >Sign up</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default LogInPage;
