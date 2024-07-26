import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/Firebase'; 

const JoinEventForm = () => {
  const { eventId } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [volunteerDetails, setVolunteerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteerDetails({ ...volunteerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(db, 'event_volunteers'), {
          eventId,
          userId: user.uid,
          ...volunteerDetails,
          timestamp: new Date()
        });
        setVolunteerDetails({
          name: '',
          email: '',
          phone: '',
        });
        navigate('/events');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="pb-4 px-6 pt-8 mb-6 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-4 w-96 text-center text-gray-800">Join Event</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={volunteerDetails.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={volunteerDetails.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={volunteerDetails.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Confirm Join
        </button>
      </form>
    </div>
  );
};

export default JoinEventForm;
