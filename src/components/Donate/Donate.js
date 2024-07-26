import React from "react";
import { useNavigate } from "react-router-dom";

function Donate() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate-now");
  };

  return (
    <div className="pt-24 width:100% bg-purple-200 pb-20">
      <h1 class="mb-4 text-6xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-center px-8">
        Donate for better <span className="text-purple-800">tomorrow.</span>
      </h1>
      <p class="mb-2 text-2xl font-normal text-black-500 dark:text-black-400 text-center px-8">
        " It's easier to take than to give. It's nobler to give than to take.
        The thrill of taking lasts a day. The thrill of giving lasts a lifetime.
        "
      </p>
      <p class="mb-1 text-lg font-normal text-slate-600 lg:text-xl sm:px-16 xl:px-48 dark:text-black-400 text-center">
        -John Marques
      </p>

      <span className="block border-t-2 border-solid border-slate-600 w-3/4 mt-4 mx-auto mb-8"></span>

      <div className="flex flex-wrap justify-around">

        <div className="mx-8 mb-4 xl:w-2/4 lg:w-screen">
          <h1 className="text-6xl font-bold text-slate-600 mb-1">Support</h1>
          <h1 className="text-6xl font-bold mb-1">
            <span className="text-purple-800">VolunTier's</span> Mission
          </h1>
          <p className="text-2xl text-slate-700 mb-2">
            Your donation helps us connect volunteers with NGOs, empowering
            communities and creating positive change.
          </p>

          <h2 className="text-3xl font-bold ">Our Mission</h2>
          <p className="text-2xl text-slate-700 mb-2">
            VolunTier's mission is to bridge the gap between volunteers and
            NGOs, fostering meaningful connections and amplifying the impact of
            community-driven initiatives.
          </p>

          <h2 className="text-3xl font-bold ">How Your Donation Helps</h2>
          <p className="text-2xl text-slate-700 mb-2">
            Your donation supports the development and maintenance of our
            platform, enabling us to connect more volunteers with NGOs in need,
            and empowering them to create lasting positive change.
          </p>
        </div>

        <div className="grow bg-gray-100 shadow-lg rounded-lg mx-8 text-left p-4">
          <h3 className="text-2xl font-bold">Donate to VolunTier</h3>
          <p className="text-xl text-slate-700 mt-2">
            Your donation helps us connect more volunteers with NGOs
          </p>
          <p className="text-xl text-slate-700 mb-2">in need.</p>

          <form action="">
            <label htmlFor="name" className="block text-base font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Name"
            />

            <label htmlFor="mail" className="block text-base font-medium mt-2">
              Email
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Email"
            />

            <label htmlFor="amout" className="block text-base font-medium mt-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Donation Amount"
            />

            <label
              htmlFor="method"
              className="block text-base font-medium mt-2"
            >
              Payment Method
            </label>
            <input
              list="methods"
              id="method"
              name="method"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Select Payment Method"
            />
            <datalist id="methods">
              <option>Credit Card</option> <option>Debit Card</option>
              <option>Net Banking</option>
              <option>UPI</option>
            </datalist>

            <button
              onClick={handleDonateClick}
              className="block px-3 py-1 mx-auto mt-4 text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 font-medium rounded-full hover:scale-105 transition-all duration-500 ease-in-out"
            >
              Donate Now!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Donate;
