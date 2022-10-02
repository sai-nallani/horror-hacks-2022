import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HouseCard from "./HouseCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";
const Home = () => {
    const housesRef = collection(db, "houses");
    const [snapshot, setSnapshot] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getDocs(query(housesRef));
            const ids = [];
            data.forEach((doc) => ids.push(doc.id));
            setSnapshot(ids);
        })();
    }, []);

    return (
        <>
            <NavBar />
            {snapshot.map((i) => (
                <>
                    <HouseCard houseId={i} />
                </>
            ))}
        </>
    );
};

export default Home;
