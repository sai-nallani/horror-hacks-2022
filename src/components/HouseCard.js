import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, storage } from "../App";
import { ref, getDownloadURL } from "firebase/storage";

const HouseCard = ({ houseId }) => {
    const [data, setData] = useState({});
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        (async () => {
            const docRef = doc(db, "houses", houseId);
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
        })();
    }, []);
    if (data) {
        const storageRef = ref(storage, "/" + houseId);
        getDownloadURL(storageRef)
            .then((url) => {
                setImgUrl(url);
            })
            .catch((error) => {
                // Handle any errors
            });
        console.log(data);
        return (
            <div className="houseCard">
                <img src={imgUrl} alt={data.desc} />
                <p>Owner: {data.owner}</p>

                <p>{data.desc}</p>
                <a href={data.googleMapsLink}>Go to Google Maps!</a>
            </div>
        );
    } else {
        return <>dawg are you in alaska</>;
    }
};

export default HouseCard;
