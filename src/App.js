import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import PostHouse from "./components/PostHouse";
import { Route, Routes } from "react-router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyko4VzzURvlnQl_cyCKCzMhIgE_Lzr4k",
    authDomain: "horror-hacks-2022.firebaseapp.com",
    projectId: "horror-hacks-2022",
    storageBucket: "horror-hacks-2022.appspot.com",
    messagingSenderId: "8227721285",
    appId: "1:8227721285:web:e1f615f5b61f7e6321132c",
    measurementId: "G-GF6NLP6HHL",
};
const fbApp = initializeApp(firebaseConfig);
export const db = getFirestore(fbApp);
const auth = getAuth(fbApp);
export const storage = getStorage();

function App() {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            <Routes>
                {user ? (
                    <>
                        <Route
                            path="/"
                            element={<Home db={db} storage={storage} />}
                        />
                        <Route
                            path="/posthouse"
                            element={<PostHouse db={db} storage={storage} />}
                        />
                        <Route path="/login" element={<Login auth={auth} />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Login auth={auth} />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
