import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase/Firebase";
import { collection } from "firebase/firestore";
import '../FrontPage1/Carousel.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-10"
  >
    <FaArrowLeft className="text-2xl" />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-10"
  >
    <FaArrowRight className="text-2xl" />
  </button>
);

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CarouselSection() {
  const [events, setEvents] = useState([]);
  const eventsRef = collection(db, "events");
  const [eventsData, loading, error] = useCollectionData(eventsRef, {
    idField: "id",
  });

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData]);

  return (
    <div className="text-black rounded-md mt-12 mb-12 mx-auto">
      <div className="text-center">
        <span className="text-2xl md:text-4xl font-bold text-purple-800">
          Happening <span className="text-black">Now <i className="fa-regular fa-calendar-check mr-3"></i></span>
        </span>
        <div className="inline-block border-t-2 border-solid border-slate-600 w-4/3 md:w-2/3 mb-1.5 mt-1 mx-auto"></div>
      </div>

      <div className="mt-6 px-4 md:px-12 relative">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading events</p>
        ) : (
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={2000}
            infinite={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            pauseOnHover={true}
          >
            {events.map((event) => (
              <div key={event.id} className="p-2">
                <div className="bg-purple-100 p-4 rounded-2xl border-[1px] border-purple-800 hover:shadow-custom-kaala h-full flex flex-col transition-all duration-1000 ease-in-out">
                  <div className="border-[1px] border-solid border-black rounded-xl p-4 overflow-hidden">
                    <img
                      src={event.thumbnail}
                      alt=""
                      className="object-contain h-56 w-full"
                    />
                    <h1 className="font-semibold text-2xl text-center mt-2">
                      {event.title}
                    </h1>
                    <div className="inline-block border-t-[1px] border-solid border-slate-500 w-5/6 my-1.5 ml-11 "></div>
                    <div id="scroll">
                      <p className="text-lg text-center w-auto pr-1">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-lg text-left m-3">
                    <p>
                      <i className="fa-regular fa-calendar-check"></i> From :{" "}
                      {formatDate(event.fromDate)}
                    </p>
                    <p>
                      <i className="fa-regular fa-calendar-xmark"></i> To :{" "}
                      {formatDate(event.toDate)}
                    </p>
                    <p>
                      <i className="fa-solid fa-hourglass-half"></i> Duration :{" "}
                      {event.timingFrom} - {event.timingTo}
                    </p>

                    <p className="decoration-solid hover:underline">
                      <a href={event.locationLink} className="text-purple-900">
                        <i className="fa-solid fa-location-dot"></i> Get there
                        now
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="block border-t-2 border-solid border-slate-500 w-11/12 mx-auto mt-8"></div>
    </div>
  );
}

export default CarouselSection;
