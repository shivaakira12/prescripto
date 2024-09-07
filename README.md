Here’s a comprehensive documentation for your React frontend project, structured as per your requirements:

---

# Prescripto - Frontend Documentation

## Project Overview

**Prescripto** is a web application designed to simplify healthcare management by offering features for scheduling doctor appointments, managing health records, and more. This documentation covers the frontend aspect of the project built with React, including its components, pages, and styling.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Vite**: Build tool for fast development and optimized production builds.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making requests.
- **React Router DOM**: Declarative routing for React applications.
- **React Toastify**: Notification library for React.
- **ESLint**: Linting utility for maintaining code quality.

## Folder Structure

Here’s a high-level overview of the folder structure:

```
src/
│
├── assets/                # Contains static assets like images
│   ├── assets.js
│   └── ...
│
├── components/            # Reusable components
│   ├── Banner.jsx
│   ├── Header.jsx
│   ├── RelatedDoc.jsx
│   ├── SpecialityMenu.jsx
│   └── TopDoctors.jsx
│
├── context/               # Contexts for global state management
│   └── AppContext.jsx
│
├── pages/                 # Page components
│   ├── About.jsx
│   ├── Appointment.jsx
│   ├── Contact.jsx
│   ├── Doctors.jsx
│   ├── Home.jsx
│   └── Login.jsx
│
├── App.jsx                # Main App component
└── index.jsx              # Entry point for React
```

## Pages

### `About.jsx`

Displays information about the company and the benefits of using the platform.

```jsx
import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>{" "}
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image}></img>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div>
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover :text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover :text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover :text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
```

### `Appointment.jsx`

Handles the appointment booking functionality, including fetching doctor information and available slots.

```jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoc from "../components/RelatedDoc";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 1; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-x5 rounded-full">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p

>
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm font-medium text-gray-900">Select date</p>
              <div className="flex flex-col gap-2">
                {docSlots.map((slots, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`border border-primary rounded-full py-2 px-5 ${
                      slotIndex === index ? "bg-primary text-white" : "text-gray-600"
                    }`}
                  >
                    {dayOfWeek[new Date(slots[0].datetime).getDay()]}
                    <br />
                    {slots[0].datetime.toLocaleDateString()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm font-medium text-gray-900">Select time</p>
              <div className="flex flex-col gap-2">
                {docSlots[slotIndex] &&
                  docSlots[slotIndex].map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setSlotTime(slot.time)}
                      className={`border border-primary rounded-full py-2 px-5 ${
                        slotTime === slot.time ? "bg-primary text-white" : "text-gray-600"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
              </div>
            </div>
            <button
              disabled={!slotTime}
              className={`w-full mt-4 py-2 px-4 border rounded-lg ${
                slotTime ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              Book Appointment
            </button>
          </div>
        </div>
        <RelatedDoc />
      </div>
    )
  );
};

export default Appointment;
```

### `Contact.jsx`

Provides contact details and a call-to-action button.

```jsx
import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <img className="w-full md:w-1/2" src={assets.contact_image} alt="Contact Us" />
        <div className="flex-1 md:w-1/2 p-4">
          <p className="text-2xl font-semibold mb-4">Contact Us</p>
          <p className="text-lg font-medium text-gray-800">
            Address: 1234 Health Street, Wellness City, HC 56789
          </p>
          <p className="text-lg font-medium text-gray-800">
            Phone: (123) 456-7890
          </p>
          <p className="text-lg font-medium text-gray-800">
            Email: support@prescripto.com
          </p>
          <a
            href="/explore-jobs"
            className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg"
          >
            Explore Jobs
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
```

### `Doctors.jsx`

Lists doctors and allows filtering by specialty.

```jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const [speciality, setSpeciality] = useState("");

  const filteredDoctors = doctors.filter(
    (doc) => !speciality || doc.speciality === speciality
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-2xl font-semibold">Our Doctors</h2>
        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">All Specialties</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          {/* Add more specialties as needed */}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDoctors.map((doc) => (
          <div key={doc._id} className="border border-gray-300 p-4 rounded-lg">
            <img
              className="w-full h-40 object-cover rounded-lg"
              src={doc.image}
              alt={doc.name}
            />
            <h3 className="text-xl font-semibold mt-2">{doc.name}</h3>
            <p className="text-gray-600">{doc.speciality}</p>
            <a
              href={`/appointment/${doc._id}`}
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg"
            >
              Book Appointment
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
```

### `Home.jsx`

Displays the home page with a header, speciality menu, top doctors, and banner.

```jsx
import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <SpecialityMenu />
      <TopDoctors />
    </div>
  );
};

export default Home;
```

### `Login.jsx`

Manages user login and registration.

```jsx
import React, { useState } from "react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border border-gray-300 rounded-lg bg-white"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        {isSignup && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded-lg"
        >
          {isSignup ? "Sign Up" : "Log In"}
        </button>
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-lg text-gray-600"
        >
          {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

## Components

### `Banner.jsx`

Displays a promotional banner.

```jsx
import React from "react";

const Banner = () => {
  return (
    <div className="bg-primary text-white py-10 px-5 text-center">
      <h1 className="text-3xl font-semibold">Welcome to Prescripto</h1>
      <p className="mt-2">Your one-stop solution for all healthcare needs.</p>
    </div>
  );
};

export default Banner;
```

### `Header.jsx`

Provides the navigation bar.

```jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray

-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Prescripto
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/doctors" className="hover:underline">Doctors</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
```

### `RelatedDoc.jsx`

Shows related doctors based on selected doctor.

```jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RelatedDoc = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="my-10">
      <h3 className="text-lg font-semibold mb-4">Related Doctors</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.slice(0, 3).map((doc) => (
          <div key={doc._id} className="border border-gray-300 p-4 rounded-lg">
            <img
              className="w-full h-40 object-cover rounded-lg"
              src={doc.image}
              alt={doc.name}
            />
            <h3 className="text-xl font-semibold mt-2">{doc.name}</h3>
            <p className="text-gray-600">{doc.speciality}</p>
            <a
              href={`/appointment/${doc._id}`}
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg"
            >
              Book Appointment
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoc;
```

### `SpecialityMenu.jsx`

Displays a menu of specialties.

```jsx
import React from "react";

const SpecialityMenu = () => {
  return (
    <div className="my-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Find Doctors by Specialty</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="bg-primary text-white py-2 px-4 rounded-lg">Cardiologist</button>
        <button className="bg-primary text-white py-2 px-4 rounded-lg">Dermatologist</button>
        <button className="bg-primary text-white py-2 px-4 rounded-lg">Pediatrician</button>
        {/* Add more specialties as needed */}
      </div>
    </div>
  );
};

export default SpecialityMenu;
```

### `TopDoctors.jsx`

Lists top doctors.

```jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="my-10">
      <h3 className="text-lg font-semibold mb-4">Top Doctors</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.slice(0, 3).map((doc) => (
          <div key={doc._id} className="border border-gray-300 p-4 rounded-lg">
            <img
              className="w-full h-40 object-cover rounded-lg"
              src={doc.image}
              alt={doc.name}
            />
            <h3 className="text-xl font-semibold mt-2">{doc.name}</h3>
            <p className="text-gray-600">{doc.speciality}</p>
            <a
              href={`/appointment/${doc._id}`}
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg"
            >
              Book Appointment
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
```

## Styling

### Global Styles (Tailwind CSS Configuration)

- **`tailwind.config.js`**:

  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#f54748',
          'primary-dark': '#d83e3e',
          'text-dark': '#2e2e2e',
          'text-light': '#595959',
          'extra-light': '#f3f4f6',
          'white': '#ffffff',
        },
        maxWidth: {
          'container': '1200px',
        },
      },
    },
    plugins: [],
  }
  ```

### Custom Styles

- **`styles.css`**:

  ```css
  body {
    display: flex;
    width: 100%;
    position: relative;
    background-color: var(--extra-light);
  }
  ```

---

Feel free to customize and expand on this documentation as needed. Let me know if there’s anything specific you’d like to add or modify!
