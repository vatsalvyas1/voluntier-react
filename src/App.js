import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Pages/Login';
import SignUpVolunteer from './components/Pages/SignUpVolunteer';
import SignUpNGO from './components/Pages/SignUpNGO';
import ProfileVolunteer from './components/Pages/ProfileVolunteer';
import ProfileNGO from './components/Pages/ProfileNGO';
import ProfileDetailsVolunteer from './components/Pages/ProfileDetailsVolunteer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDetailsNGO from './components/Pages/ProfileDetailsNGO';
import FrontPage1 from './components/FrontPage1/FrontPage1';
import EventForm from './components/Events/EventForm'; 
import EventList from './components/Events/EventList'; 
import JoinEventForm from './components/Events/JoinEventForm'; // Import the JoinEventForm component
import OurTeam from './components/Team/OurTeam';
import Donate from './components/Donate/Donate';
import Explore from './components/Explore/Explore';
import EventsJoined from './components/Events/EventsJoined';
import DonateNow from './components/Donate/DonateNow';
import HostedEvents from './components/Events/HostedEvents';
import { AuthProvider } from './components/Auth/Auth';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <div>
          <ToastContainer />
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-volunteer" element={<SignUpVolunteer />} />
          <Route path="/signup-ngo" element={<SignUpNGO />} />
          <Route path="/profile-ngo" element={<ProfileNGO />} />
          <Route path="/profile-volunteer" element={<ProfileVolunteer />} />
          <Route path="/profile-details-volunteer" element={<ProfileDetailsVolunteer />} />
          <Route path="/profile-details-ngo" element={<ProfileDetailsNGO />} />
          <Route path="/add-event" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/join-event/:eventId" element={<JoinEventForm />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events-joined/:userId" element={<EventsJoined />} />
          <Route path="/donate-now" element={<DonateNow />} />
          <Route path="/hosted-events" element={<HostedEvents />} />

        </Routes>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
