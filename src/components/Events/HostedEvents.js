import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const HostedEvents = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostedEvents = async () => {
      if (user) {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("organizerId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const eventsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            fromDate: data.fromDate.toDate().toLocaleDateString(),
            toDate: data.toDate.toDate().toLocaleDateString(),
            timingFrom: data.timingFrom,
            timingTo: data.timingTo,
            thumbnail: data.thumbnail,
          };
        });

        setEvents(eventsList);
      }
    };

    fetchHostedEvents();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">
            Please log in to view your hosted events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hosted-events pt-20 h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-purple-800">Hosted</span> Events
      </h2>

      <div className="events-list flex flex-wrap justify-center">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-item bg-white shadow-lg rounded-lg p-4 m-6 w-5/12 hover:scale-105 hover:shadow-lg transition-all duration-1000 ease-in-out "
          >
            {event.thumbnail && (
              <img
                src={event.thumbnail}
                alt={event.title}
                className="mb-4 rounded-lg w-full h-32 object-cover"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="mb-2">{event.description}</p>
            <p className="text-sm text-gray-600"><i class="fa-solid fa-location-dot"></i> {event.address}</p>
            <p className="text-sm text-gray-600">From: {event.fromDate}</p>
            <p className="text-sm text-gray-600">To: {event.toDate}</p>
            <p className="text-sm text-gray-600">
              Time: {event.timingFrom} - {event.timingTo}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/profile-details-ngo")}
          className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 font-medium rounded-full text-sm px-5 py-2.5 hover:scale-105 transition-all duration-500 ease-in-out"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default HostedEvents;
