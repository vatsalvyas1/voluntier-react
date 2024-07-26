import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const EventCard = ({ event, showEventDetails, showJoinButton = true, clickable = true }) => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfVolunteer = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "VolunteerUsers", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsVolunteer(true);
        }
      }
    };
    checkIfVolunteer();
  }, [auth, db]);

  const formatDate = (date) => {
    if (!date) return "";

    if (date instanceof Date === false && date.toDate) {
      date = date.toDate();
    }

    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleCardClick = () => {
    if (clickable) {
      showEventDetails(event.id);
    }
  };

  const handleJoinEventClick = (e) => {
    e.stopPropagation();
    navigate(`/join-event/${event.id}`);
  };

  return (
    <div
      className={`p-4 border rounded-lg mb-6 flex flex-col shadow-md bg-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500 transition-all duration-1000 ease-in-out ${
        clickable ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
      style={{ width: '380px', height: '450px' }} 
    >
      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600">{event.address}</p>
          <p className="text-gray-600 mb-2">
            <span className="block">
              <strong>From:</strong> {formatDate(event.fromDate)}
            </span>
            <span className="block">
              <strong>To:</strong> {formatDate(event.toDate)}
            </span>
          </p>
        </div>
        {isVolunteer && showJoinButton && (
          <button
            onClick={handleJoinEventClick}
            className="w-full mt-auto px-3 py-1 text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 font-medium rounded-full hover:scale-105 transition-all duration-500 ease-in-out"
          >
            Join Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
