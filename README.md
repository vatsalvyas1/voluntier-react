# VolunTier

VolunTier is a web application designed to connect volunteers with NGOs, providing a platform for managing events, donations, and community interactions.

# Features

# 1\. Authentication -

Firebase Authentication: Users can log in and sign up using their Google accounts.

# 2\. Sections -

- Home

Overview of the application and its purpose.

- Donate

Users can donate items or money.

Redirects to a payment gateway for monetary donations.

- Community

NGOs can add posts about past events.

Volunteers can like or comment on these posts.

- Events

NGOs can add events.

Volunteers can join events.

Event data is stored in Firestore, and event thumbnails and media are stored in Firebase Storage.

- Our Team

Information about the team behind VolunTier.

# 3\. Profile

Displays user details.

Shows events joined by volunteers or hosted by NGOs.

Allows users to edit their profiles, including uploading a profile image from their Google account or a local file.

Hosted Events Button: Shows the events hosted by an NGO user.

Events Joined Button: Shows the events a volunteer has joined.

# 4\. Technologies Used

- Frontend

React: JavaScript library for building user interfaces.

Tailwind CSS: Utility-first CSS framework for styling.

Multi Carousel: React library for carousels.

React Player: Library to display videos by taking URLs from users.

- Backend

Firestore Database: NoSQL database for storing user and event data.

Firebase Storage: Cloud storage for storing event thumbnails and other media.

- Authentication

Firebase Authentication: Handles user authentication via Google accounts.

# 5\. Collections in Firestore

- NGOUsers: Stores details of NGO users.

- VolunteerUsers: Stores details of volunteer users.

- event_volunteers: Stores information about volunteers who joined events.

- Posts: Stores posts created by NGOs, with subcollections for likes and comments.

- events: Stores details of events created by NGOs.
