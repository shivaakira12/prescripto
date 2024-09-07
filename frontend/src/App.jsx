import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/doctors" element={<Doctors></Doctors>}></Route>
        <Route
          path="/doctors/:speciality"
          element={<Doctors></Doctors>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
        <Route
          path="/my-appointments"
          element={<MyAppointments></MyAppointments>}
        ></Route>
        <Route path="/appointment/:docId" element={<Appointment />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
