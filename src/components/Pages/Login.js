import React from "react";
import { signInWithGoogle, logOut } from "../Auth/Auth"; // Ensure logOut is imported
import { db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        const volunteerDocRef = doc(db, "VolunteerUsers", user.uid);
        const ngoDocRef = doc(db, "NGOUsers", user.uid);

        const volunteerDoc = await getDoc(volunteerDocRef);
        const ngoDoc = await getDoc(ngoDocRef);

        if (volunteerDoc.exists()) {
          toast.success("Login successful!");
          navigate("/");
        } else if (ngoDoc.exists()) {
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error("You need to sign up first.");
          await logOut(); // Sign out the user
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page pt-44 flex items-center justify-center py-40">
      <div className="bg-gray-50 p-10 rounded-xl shadow-2xl text-center w-11/12 max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Login to your Profile</h2>
        <button
          onClick={handleLogin}
          className="bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-200 transform hover:scale-105"
        >
          Login with Google
        </button>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup-volunteer" className="text-purple-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
