import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import EventCard from './EventCard';
import JoinEventForm from './JoinEventForm';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [joiningEventId, setJoiningEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  const joinEvent = (eventId) => {
    setJoiningEventId(eventId);
  };

  const confirmJoin = async (eventId, volunteerDetails) => {
    try {
      await addDoc(collection(db, 'event_volunteers'), {
        eventId,
        ...volunteerDetails
      });
      console.log(`Volunteer ${volunteerDetails.name} joined event ${eventId}`);
      setJoiningEventId(null);
    } catch (error) {
      console.error('Error joining event: ', error);
    }
  };

  const showEventDetails = async (eventId) => {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSelectedEvent({ id: eventId, ...docSnap.data() });
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold text-center mb-6"><span className='text-purple-800'>Current</span> Events</h1>
      {selectedEvent ? (
        <div className="p-6 border border-gray-300 rounded-lg mb-6 shadow-lg bg-white">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 text-center">{selectedEvent.title}</h2>
          <img 
            src={selectedEvent.thumbnail} 
            alt={selectedEvent.title} 
            className="w-full h-64 mb-4 object-cover rounded-lg shadow-sm"
          />
          <p className="text-gray-700 mb-4 text-center text-xl font-medium">{selectedEvent.description}</p>
          <div className="mb-4">
            <p className="text-gray-700 text-xl"><strong>From:</strong> {formatDate(selectedEvent.fromDate)}</p>
            <p className="text-gray-700 text-xl"><strong>To:</strong> {formatDate(selectedEvent.toDate)}</p>
            <p className="text-gray-700 text-xl"><strong>Duration:</strong> {selectedEvent.timingFrom} - {selectedEvent.timingTo}</p>
            <span className="text-gray-700 text-xl"><strong>Venue:</strong> {selectedEvent.address} </span>
            <a 
              href={selectedEvent.locationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 underline hover:text-gray-800"
            >
              <i className="fa-solid fa-share-from-square text-2xl"></i>
            </a>
            <p className="text-gray-700 mb-6 text-xl"><strong>Rewards:</strong> {selectedEvent.prizes}</p>
          </div>
          
          <button 
            onClick={() => setSelectedEvent(null)}
            className="px-4 py-2 text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full"
          >
            Back to Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              joinEvent={joinEvent} 
              showEventDetails={showEventDetails} 
            />
          ))}
        </div>
      )}
      {joiningEventId && <JoinEventForm eventId={joiningEventId} confirmJoin={confirmJoin} />}
    </div>
  );
};

export default EventList;
