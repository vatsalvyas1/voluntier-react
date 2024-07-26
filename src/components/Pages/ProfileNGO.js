import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Badge from "@mui/material/Badge";
import user1 from "../../assests/images/user.png"; // default image

const ProfileNGO = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
    about: "",
    profileImage: user1, // default image
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        name: user.displayName || "",
        email: user.email || "",
        profileImage: user.photoURL || user1, // fetch profile image from Google account
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileDetails({ ...profileDetails, profileImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const docRef = doc(db, "NGOUsers", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, profileDetails);
        console.log("Profile created successfully");
      } else {
        await setDoc(docRef, profileDetails, { merge: true });
        console.log("Profile updated successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="profile-page pt-32 pb-12 sm:px-6 lg:px-8">
      <div className="flex">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-6 max-h-full mr-5 text-center">
          <Badge
            badgeContent={<i className="fa-solid fa-pen"></i>}
            color="primary"
            onClick={() => document.getElementById("profileImageInput").click()}
          >
            <img
              src={imagePreview || profileDetails.profileImage}
              alt=""
              className="max-h-36 max-w-36 rounded-full object-cover"
            />
          </Badge>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <h2 className="text-purple-800 font-semibold text-3xl mt-2">
            {profileDetails.name}
          </h2>
          <p className="text-slate-500">{profileDetails.email}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Enter Profile Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileDetails.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Your Username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={profileDetails.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your email address"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={profileDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Your Address"
              />
            </div>

            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code:
              </label>
              <input
                type="number"
                id="postalCode"
                name="postalCode"
                required
                value={profileDetails.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Your Postal Code"
              />
            </div>

            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Write about your NGO:
              </label>
              <input
                type="textarea"
                id="about"
                name="about"
                required
                value={profileDetails.about}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Write something about your NGO"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5 mt-6"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileNGO;
