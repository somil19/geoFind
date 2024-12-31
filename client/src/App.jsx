import AddressSearchBar from "./components/AdressSearchBar";
import MapWithPin from "./components/MapWithPin";

import AddressManagement from "./components/AdressManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
export default function App() {
  // <div className="text-4xl text-center text-blue-500">Radhe Radhe !</div>

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-address" element={<AddressSearchBar />} />
        <Route path="/mapWithPin" element={<MapWithPin />} />
        <Route path="/address-management" element={<AddressManagement />} />
      </Routes>
    </div>
  );
}
