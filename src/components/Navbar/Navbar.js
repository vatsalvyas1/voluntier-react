import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/Firebase"; 
import { logOut } from "../Auth/Auth"; 
import { doc, getDoc } from "firebase/firestore";
import logo from '../../assests/images/logo.png';

const NAVBAR_CLASSES = {
  container: "w-full px-4 sm:px-6 lg:px-8",
  flex: "flex justify-between items-center h-16",
  logo: "h-40 w-auto",
  link: "border-transparent text-zinc-500 dark:text-zinc-300 hover:border-zinc-300 hover:text-zinc-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium",
  button: "bg-purple-700 text-white hover:bg-purple-500 px-3 py-2 rounded-md text-sm font-medium",
  dropdown: "absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg py-1 z-20",
  dropdownLink: "block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900",
  loginButton: "bg-white text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm ml-4 font-bold",
};

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUserType] = useState(null);
  let timeoutId = null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      if (user) {
        const volunteerDocRef = doc(db, "VolunteerUsers", user.uid);
        const ngoDocRef = doc(db, "NGOUsers", user.uid);

        const volunteerDoc = await getDoc(volunteerDocRef);
        const ngoDoc = await getDoc(ngoDocRef);

        if (volunteerDoc.exists()) {
          setUserType("volunteer");
        } else if (ngoDoc.exists()) {
          setUserType("ngo");
        }
      }
    };

    fetchUserType();
  }, [user]);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUserType(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const Logo = () => (
    <div className="flex items-center">
      <div className="w-52 h-auto -ml-9">
        <img src={logo} alt="VolunTier logo" className={NAVBAR_CLASSES.logo} />
      </div>
    </div>
  );

  const NavLinks = () => (
    <div className="hidden sm:flex sm:space-x-8">
      <Link to="/" className={NAVBAR_CLASSES.link}>
        Home
      </Link>
      <Link to="/donate" className={NAVBAR_CLASSES.link}>
        Donate
      </Link>
      <Link to="/explore" className={NAVBAR_CLASSES.link}>
        Community
      </Link>
      <Link to="/events" className={NAVBAR_CLASSES.link}>
        Events
      </Link>
      <Link to="/our-team" className={NAVBAR_CLASSES.link}>
        Our Team
      </Link>
    </div>
  );

  const Dropdown = () => (
    <div
      className={NAVBAR_CLASSES.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/signup-volunteer" className={NAVBAR_CLASSES.dropdownLink}>
        Sign Up as Volunteer
      </Link>
      <Link to="/signup-ngo" className={NAVBAR_CLASSES.dropdownLink}>
        Sign Up as NGO
      </Link>
    </div>
  );

  const ProfileLink = () => {
    if (userType === "volunteer") {
      return (
        <Link to="/profile-details-volunteer" className={NAVBAR_CLASSES.loginButton}>
          My Profile
        </Link>
      );
    } else if (userType === "ngo") {
      return (
        <Link to="/profile-details-ngo" className={NAVBAR_CLASSES.loginButton}>
          My Profile
        </Link>
      );
    }
    return null;
  };

  const AddEventButton = () => {
    if (user && userType === "ngo") {
      return (
        <Link to="/add-event" className={`${NAVBAR_CLASSES.button} mx-2 my-2 px-4 ml-5 py-2`}>
          Add Event
        </Link>
      );
    }
    return null;
  };

  return (
    <nav className="bg-transparent dark:bg-zinc-900/75 backdrop-blur border-b z-50 border-zinc-200 dark:border-zinc-700 w-full fixed">
      <div className={NAVBAR_CLASSES.container}>
        <div className={NAVBAR_CLASSES.flex}>
          <Logo />
          <NavLinks />
          <div className="flex items-center">
            {user && <ProfileLink />}
            <AddEventButton />
            {!user && (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className={NAVBAR_CLASSES.button}>Sign Up</button>
                {showDropdown && <Dropdown />}
              </div>
            )}
            {user ? (
              <button onClick={handleLogout} className={NAVBAR_CLASSES.loginButton}>
                Logout
              </button>
            ) : (
              <Link to="/login" className={NAVBAR_CLASSES.loginButton}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
