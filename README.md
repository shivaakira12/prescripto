Prescripto - Healthcare Appointment Booking

This project is a React application for a healthcare appointment booking platform called Prescripto. Users can browse through a list of doctors based on their specialty, view doctor details and book appointments.

Getting Started

Clone this repository:
Bash
git clone https://github.com/your-username/prescripto.git
Use code with caution.

Install dependencies:
Bash
cd prescripto
npm install
Use code with caution.

Run the development server:
Bash
npm start
Use code with caution.

This will start the development server and open the application in your web browser at http://localhost:3000/.

Technologies Used

React
React Router DOM
Tailwind CSS
React Context
Project Structure

prescripto/
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── about_image.jpg
│   │   ├── contact_image.jpg
│   │   ├── verified_icon.svg
│   │   └── info_icon.svg
│   ├── components/
│   │   ├── Banner.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── RelatedDoc.jsx
│   │   ├── SpecialityMenu.jsx
│   │   └── TopDoctors.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Appointment.jsx
│   │   ├── Contact.jsx
│   │   ├── Doctors.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyAppointments.jsx
│   │   └── MyProfile.jsx
│   ├── index.css
│   └── index.jsx
└── package.json
Documentation

This application uses React components to structure the user interface. Each component is a reusable piece of code that can be used throughout the application.

App.jsx: The main component of the application. It renders the top-level components like Navbar, Footer, and Routes.
components: This directory contains reusable UI components like Banner, Footer, Header, etc.
context: This directory contains the application context which provides data to child components.
pages: This directory contains all the page components like About, Appointment, Contact, etc.
index.css: Contains global styles for the application.
index.jsx: Renders the root component of the application (App.jsx) and configures React Router.
