// export default AppContextProvider;
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | succeeded | failed
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to SF
  const [houseDetails, setHouseDetails] = useState("");
  const [apartmentDetails, setApartmentDetails] = useState("");
  const [addressCategory, setAddressCategory] = useState(""); // home | office | friends
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const backendUrl = "http://localhost:5000";

  // Validate Address Function

  // Add Address Function
  const addAddress = (newAddress) => {
    setSavedAddresses([...savedAddresses, newAddress]);
  };

  // Update Address Function
  const updateAddress = (updatedAddress) => {
    setSavedAddresses(
      savedAddresses.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address
      )
    );
  };

  // Delete Address Function
  const deleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        showLogin,
        setShowLogin,
        user,
        setUser,
        address,
        setAddress,

        status,
        error,

        location,
        setLocation, // Add location state
        houseDetails,
        setHouseDetails,
        apartmentDetails,
        setApartmentDetails,
        addressCategory,
        setAddressCategory,
        savedAddresses,
        setSavedAddresses,
        recentSearches,
        setRecentSearches,
        addAddress,
        updateAddress,
        deleteAddress,
        backendUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
