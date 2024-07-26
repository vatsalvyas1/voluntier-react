import React from "react";
import abicon from "../../assests/images/abicon.png";

const Card = ({ title, content }) => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-xl m-4 w-2/5 hover:scale-105 transition-all duration-1000 ease-in-out">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="mt-4 text-lg">{content}</p>
  </div>
);

function AboutUsSection() {
  return (
    <div className="bg-purple-200 px-4 md:px-12">
      <h1 className="text-5xl font-extrabold p-6 text-center">
        <span className="text-purple-800">About</span> Us :
      </h1>
      <div className="flex justify-between">
        <div className="pt-24">
          <img
            src={abicon}
            alt=""
            style={{
              height: "500px",
              width: "500px",
            }}
          ></img>
        </div>

        <div className="flex flex-wrap justify-center w-3/4 mb-6">
          <Card
            title="Our Mission"
            content="VolunTier is a platform dedicated to connecting volunteers with NGOs to foster a collaborative environment for social good. Our mission is to bridge the gap between passionate individuals and organizations that are striving to make a difference in various sectors such as education, healthcare, environment, and more."
          />
          <Card
            title="Our Belief"
            content="We believe in the power of community and the impact that collective efforts can have in addressing the challenges our world faces today. By providing a seamless interface and valuable resources, we aim to empower volunteers and NGOs alike to achieve their goals and create a sustainable future."
          />
          <Card
            title="Join Us"
            content="Join us in our journey to make the world a better place, one step at a time. Whether you're looking to volunteer or an NGO in need of support, VolunTier is here to help you make meaningful connections and impactful contributions."
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;
