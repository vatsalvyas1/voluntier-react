import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/Firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import EventCard from "./EventCard";

const EventsJoined = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const q = query(
          collection(db, "event_volunteers"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const eventPromises = querySnapshot.docs.map(async (docSnap) => {
          const eventId = docSnap.data().eventId;
          const eventDoc = await getDoc(doc(db, "events", eventId));
          return eventDoc.exists() ? { id: eventId, ...eventDoc.data() } : null;
        });
        const eventResults = await Promise.all(eventPromises);
        setEvents(eventResults.filter((event) => event !== null));
      }
    };

    fetchEvents();
  }, [user]);

  const showEventDetails = async (eventId) => {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSelectedEvent({ id: eventId, ...docSnap.data() });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">
            Please log in to view the events you have joined.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-purple-800">Events</span> Joined
      </h2>

      {selectedEvent ? (
        <div className="m-4 border border-gray-300 flex flex-col items-center rounded-lg shadow-lg p-6">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 text-center">{selectedEvent.title}</h2>
          <img 
            src={selectedEvent.thumbnail} 
            alt={selectedEvent.title} 
            className="w-full h-64 mb-4 object-cover rounded-lg shadow-sm"
          />
          <p className="text-gray-700 mb-4 text-center text-xl font-medium">{selectedEvent.description}</p>
          <p className="text-gray-700 text-xl">
            <strong>From:</strong> {new Date(selectedEvent.fromDate.toDate()).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-xl">
            <strong>To:</strong> {new Date(selectedEvent.toDate.toDate()).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-xl"><strong>Duration:</strong> {selectedEvent.timingFrom} - {selectedEvent.timingTo}</p>
          <span className="text-gray-700 text-xl"><strong>Venue:</strong> {selectedEvent.address} <a 
              href={selectedEvent.locationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 underline hover:text-gray-800"
            >
              <i className="fa-solid fa-share-from-square text-2xl"></i>
            </a></span>
            <p className="text-gray-700 mb-6 text-xl"><strong>Rewards:</strong> {selectedEvent.prizes}</p>
          <button
            className="px-4 py-2 bg-purple-800 text-white rounded-full"
            onClick={() => setSelectedEvent(null)}
          >
            Back to Joined Events
          </button>
        </div>
      ) : (
        <>
          {events.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  showEventDetails={showEventDetails}
                  showJoinButton={false}
                  clickable={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500">
              You haven't joined any events yet.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsJoined;
