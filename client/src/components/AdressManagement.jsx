import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUserFriends,
  faTrash,
  faEdit,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import AddressSearchBar from "./AdressSearchBar";

const AddressManagement = () => {
  const {
    savedAddresses,

    recentSearches,

    updateAddress,
    deleteAddress,
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    deleteAddress(id);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search functionality (e.g., filter recent searches or fetch suggestions)
  };

  const handleEdit = (address) => {
    // Logic to edit the address
    const updatedAddress = { ...address, type: "Updated Type" }; // Example update
    updateAddress(updatedAddress);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Your Location</h2>

      {/* Search Bar */}
      <div className="flex justify-start">
        <AddressSearchBar />
      </div>

      {/* Saved Locations */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Saved Location</h3>
        <div>
          {savedAddresses.map((address) => (
            <div
              key={address.id}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={
                    address.type === "Home"
                      ? faHome
                      : address.type === "Office"
                      ? faBriefcase
                      : faUserFriends
                  }
                  className="text-red-500 mr-3"
                />
                <div>
                  <p className="font-bold">{address.type}</p>
                  <p className="text-sm text-gray-600">{address.address}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleEdit(address)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-lg"
                  onClick={() => handleDelete(address.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div>
        <h3 className="font-bold mb-2">Recent Searches</h3>
        <div>
          {recentSearches.map((search, index) => (
            <div key={index} className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-red-500 mr-3"
              />
              <p className="text-gray-600">{search}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
