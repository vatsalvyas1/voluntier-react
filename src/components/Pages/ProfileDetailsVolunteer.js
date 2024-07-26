import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import user1 from "../../assests/images/user.png";

const ProfileDetailsVolunteer = () => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
    age: "",
    sex: "",
    photoURL: ""
  });
  const [profileImage, setProfileImage] = useState(user1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "VolunteerUsers", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setProfile(profileData);

          if (profileData.photoURL) {
            setProfileImage(profileData.photoURL);
          }
        } else {
          setProfile((prevProfile) => ({
            ...prevProfile,
            name: user.displayName,
            email: user.email,
          }));
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">Please log in to view your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-details pt-20 h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-purple-800">Welcome! </span>to your profile
      </h2>
      {profile ? (
        <div className="flex">
          <div className="bg-white shadow-lg rounded-full mx-5 p-6 text-center w-1/4">
            <img
              src={profileImage}
              alt="Profile"
              className="max-h-36 max-w-36 mx-auto mb-2 rounded-full"
            />
            <h2 className="text-purple-800 font-semibold text-3xl mt-2">{profile.name}</h2>
            <p className="text-slate-500">{profile.email}</p>
          </div>

          <div className="grow p-6 bg-white shadow-lg rounded-lg mr-5">
            <div className="text-lg">
              <p className="mb-4">
                <strong className="font-semibold">Name: </strong>
                {profile.name}
              </p>
              <p className="mb-4">
                <strong className="font-semibold">Email: </strong>
                {profile.email}
              </p>
              <p className="mb-4">
                <strong className="font-semibold">Address: </strong>
                {profile.address}
              </p>
              <p className="mb-4">
                <strong className="font-semibold">Postal Code: </strong>
                {profile.postalCode}
              </p>
              <p className="mb-4">
                <strong className="font-semibold">Age: </strong>
                {profile.age}
              </p>
              <p className="mb-4">
                <strong className="font-semibold">Sex: </strong>
                {profile.sex}
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate("/profile-volunteer")}
                className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5 mt-6 mr-2"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate(`/events-joined/${user.uid}`)}
                className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5 mt-6"
              >
                Events Joined
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500">
          You haven't filled in the details yet.
        </div>
      )}
    </div>
  );
};

export default ProfileDetailsVolunteer;
