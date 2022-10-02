import React, { useState } from "react";
import NavBar from "./NavBar";
import { ref, uploadBytes } from "firebase/storage";

import { doc, setDoc, GeoPoint } from "firebase/firestore";

const PostHouse = ({ db, storage }) => {
    const [imgSrc, setImgSrc] = useState("");
    const [img, setImg] = useState(new File([], "temp"));
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        exactLocation: new GeoPoint(0, 0),
    });
    const [desc, setDesc] = useState("");
    const [owner, setOwner] = useState("");
    const [name, setName] = useState("");
    const [googleMapsLink, setGoogleMapsLink] = useState("");
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                setGoogleMapsLink(
                    `https://www.google.com/maps/dir//'${coords.latitude},${coords.longitude}'/`
                );
                setAddress({
                    ...address,
                    exactLocation: new GeoPoint(
                        coords.latitude,
                        coords.longitude
                    ),
                });
            });
        } else {
            alert("We need location to do anything lmao.");
        }
    }
    const submit = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, name);
        uploadBytes(storageRef, img).then((snapshot) =>
            console.log("just uploaded sum shit")
        );
        await setDoc(doc(db, "houses", name), {
            desc,
            owner,
            address,
            googleMapsLink,
        });
    };
    getLocation();
    const handleImageUpload = (e) => {
        let file = e.target.files[0];
        setImgSrc(URL.createObjectURL(file));
        setImg(file);
    };
    return (
        <>
            <NavBar />
            <img className="houseimg" src={imgSrc} alt="" />

            <form className="houseform" onSubmit={submit}>
                <input
                    className="form-control"
                    onChange={handleImageUpload}
                    type="file"
                    id="formFile"
                />
                Creative Name:
                <input
                    type="text"
                    id="cName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
                Owner:
                <input
                    type="text"
                    id="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="form-control"
                />
                Street:
                <input
                    type="text"
                    id="street"
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            street: e.target.value,
                        })
                    }
                    className="form-control"
                />
                City:
                <input
                    type="text"
                    id="city"
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            city: e.target.value,
                        })
                    }
                    className="form-control"
                />
                State:
                <input
                    type="text"
                    id="state"
                    onChange={(e) => {
                        setAddress({
                            ...address,
                            state: e.target.value,
                        });
                    }}
                    className="form-control"
                />
                Google Maps Link of House:
                <input
                    type="url"
                    id="gmaps"
                    value={googleMapsLink}
                    onChange={(e) => setGoogleMapsLink(e.target.value)}
                    className="form-control"
                />
                House Description:
                <textarea
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="10"
                    className="form-control"
                    onChange={(e) => setDesc(e.target.value)}
                    defaultValue={desc}
                ></textarea>
                <button className="btn btn-primary btn-large" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default PostHouse;
