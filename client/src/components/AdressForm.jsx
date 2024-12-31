import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const {
    houseDetails,
    setHouseDetails,
    apartmentDetails,
    setApartmentDetails,
    addressCategory,
    setAddressCategory,
  } = useContext(AppContext);
  const { addAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSave = () => {
    const newAddress = {
      id: Date.now(),
      type: addressCategory,
      address: `${houseDetails}, ${apartmentDetails}`,
    };
    addAddress(newAddress);
    navigate("/address-management");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-bold mb-4">Enter Address Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          House / Flat / Block No.
        </label>
        <input
          type="text"
          value={houseDetails}
          onChange={(e) => setHouseDetails(e.target.value)}
          placeholder="Enter House/Flat/Block No."
          className="w-full border rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Apartment / Road / Area
        </label>
        <input
          type="text"
          value={apartmentDetails}
          onChange={(e) => setApartmentDetails(e.target.value)}
          placeholder="Enter Apartment/Road/Area"
          className="w-full border rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Save Address As</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setAddressCategory("home")}
            className={`p-4 rounded-xl ${
              addressCategory === "home"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faHome} />
            <span className="ml-2">Home</span>
          </button>
          <button
            onClick={() => setAddressCategory("office")}
            className={`p-4 rounded-xl ${
              addressCategory === "office"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <span className="ml-2">Office</span>
          </button>
          <button
            onClick={() => setAddressCategory("friends")}
            className={`p-4 rounded-xl ${
              addressCategory === "friends"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faUserFriends} />
            <span className="ml-2">Friends & Family</span>
          </button>
        </div>
      </div>
      <button
        onClick={handleSave}
        className=" px-4 py-2 bg-green-500 text-white rounded-md mt-4"
      >
        {" "}
        Save Address{" "}
      </button>
    </div>
  );
};

export default AddressForm;
