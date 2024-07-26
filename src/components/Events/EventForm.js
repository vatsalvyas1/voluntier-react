import React, { useState, useRef } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { db, storage, auth } from "../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

const EventForm = () => {
  const [user] = useAuthState(auth); 
  const [eventDetails, setEventDetails] = useState({
    title: "",
    thumbnail: null,
    prizes: "",
    address: "",
    locationLink: "",
    timingFrom: "",
    timingTo: "",
    fromDate: null,
    toDate: null,
    description: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setEventDetails({ ...eventDetails, [field]: date });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails({ ...eventDetails, thumbnail: file });
    }
  };

  const handleTimePickerChange = (time, field) => {
    setEventDetails({ ...eventDetails, [field]: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (eventDetails.description.length < 20) {
      alert("Description must be at least 20 characters long.");
      return;
    }

    if (eventDetails.thumbnail) {
      const storageRef = ref(
        storage,
        `thumbnails/${eventDetails.thumbnail.name}`
      );
      await uploadBytes(storageRef, eventDetails.thumbnail);
      const downloadURL = await getDownloadURL(storageRef);
      eventDetails.thumbnail = downloadURL;
    }

    try {
      await addDoc(collection(db, "events"), {
        ...eventDetails,
        organizerId: user.uid, 
      });
      setEventDetails({
        title: "",
        thumbnail: null,
        prizes: "",
        address: "",
        locationLink: "",
        timingFrom: "",
        timingTo: "",
        fromDate: null,
        toDate: null,
        description: "",
      });
      fileInputRef.current.value = null;
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return (
    <div className="relative z-10 pt-28 pb-10 px-4 sm:px-6 md:px-8 bg-gray-200">
      <h2 className="text-4xl font-bold mb-4 text-center">
        <span className="text-purple-800">Add</span> Event
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow-md rounded-lg w-2/3 mx-auto space-y-2 mb-4"
      >
        {" "}
        {/* Reduced padding and space between elements */}
        {/* Event Title */}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title :
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={eventDetails.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Thumbnail Upload */}
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700"
        >
          Upload event image &#40;png,jpg,jpeg&#41; :
        </label>
        <input
          id="file"
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
          ref={fileInputRef}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg file:border-0 file:bg-blue-500 file:text-white file:rounded-lg file:p-1 file:cursor-pointer transition duration-300"
        />
        {/* Prizes/Stipends */}
        <label
          htmlFor="reward"
          className="block text-sm font-medium text-gray-700"
        >
          Reward Provided &#40;if any&#41; :
        </label>
        <input
          id="reward"
          type="text"
          name="prizes"
          value={eventDetails.prizes}
          onChange={handleChange}
          placeholder="Rewards"
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Address */}
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Enter event address :
        </label>
        <input
          id="address"
          type="text"
          name="address"
          value={eventDetails.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Location Link */}
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Location link :
        </label>
        <input
          id="link"
          type="text"
          name="locationLink"
          value={eventDetails.locationLink}
          onChange={handleChange}
          placeholder="Google Map Location Link"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* From Date Picker */}
        <label
          htmlFor="fromdate"
          className="block text-sm font-medium text-gray-700"
        >
          Enter event starting date :
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg p-1 text-sm">
          <FaCalendarAlt className="text-gray-500 mr-1" />
          <DatePicker
            id="fromdate"
            selected={eventDetails.fromDate}
            onChange={(date) => handleDateChange(date, "fromDate")}
            placeholderText="From"
            required
            className="w-full outline-none"
          />
        </div>
        {/* To Date Picker */}
        <label
          htmlFor="todate"
          className="block text-sm font-medium text-gray-700"
        >
          Enter event ending date :
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg p-1 text-sm">
          <FaCalendarAlt className="text-gray-500 mr-1" />
          <DatePicker
            id="todate"
            selected={eventDetails.toDate}
            onChange={(date) => handleDateChange(date, "toDate")}
            placeholderText="To"
            required
            className="w-full outline-none"
          />
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Event duration :
        </label>
        {/* Timing From */}
        <span className="text-sm">Starting time: </span>
        <div className="flex items-center border border-gray-300 rounded-lg p-1 text-sm">
          <FaClock className="text-gray-500 mr-1" />
          <TimePicker
            onChange={(time) => handleTimePickerChange(time, "timingFrom")}
            value={eventDetails.timingFrom}
            required
            className="w-full outline-none"
          />
        </div>
        {/* Timing To */}
        <span className="text-sm">Ending time: </span>
        <div className="flex items-center border border-gray-300 rounded-lg p-1 text-sm">
          <FaClock className="text-gray-500 mr-1" />
          <TimePicker
            onChange={(time) => handleTimePickerChange(time, "timingTo")}
            value={eventDetails.timingTo}
            required
            className="w-full outline-none"
          />
        </div>
        {/* Description */}
        <label
          htmlFor="desc"
          className="block text-sm font-medium text-gray-700"
        >
          Write event description:
        </label>
        <textarea
          id="desc"
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
          placeholder="Description (min 20 characters)"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Add Event Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
