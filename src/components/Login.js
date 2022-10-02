import React from "react";
import NavBar from "./NavBar";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const provider = new GoogleAuthProvider();
const Login = ({ auth }) => {
    const [user] = useAuthState(auth);
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(
                //     result
                // );
                // const token = credential.accessToken;
                // The signed-in user info.
                // const user = result.user;
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(
                // error
                // );
                // ...
            });
    };
    const signOut = () => {
        return (
            auth.currentUser && (
                <button
                    className="btn btn-lg btn-primary"
                    onClick={() => {
                        auth.signOut();
                        window.location = "/";
                    }}
                >
                    Sign out
                </button>
            )
        );
    };
    return (
        <>
            {user && <NavBar />}
            {user ? (
                signOut()
            ) : (
                <button className="btn btn-lg btn-primary" onClick={signIn}>
                    Sign In with Google
                </button>
            )}
        </>
    );
};

export default Login;
