import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AddressSearchBar = () => {
  const { address, setAddress, setLocation } = useContext(AppContext);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleInputChange = async (e) => {
    const userInput = e.target.value;
    setAddress(userInput);

    if (userInput.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${userInput}&key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const data = await response.json();
        // console.log(data);
        if (data.status === "OK") {
          setSuggestions(data.predictions);
          setError("");
        } else {
          setSuggestions([]);
          setError("No location found");
        }
      } catch (err) {
        setError("Failed to fetch suggestions");
      } finally {
        setLoading(false);
        // setError("");
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSelectAddress = async (suggestion) => {
    const placeId = suggestion.place_id;

    // Fetch the place details
    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();

    if (data.result && data.result.geometry) {
      const location = data.result.geometry.location;
      setAddress(suggestion.description);
      setSuggestions([]); // Clear suggestions
      setLocation({ lat: location.lat, lng: location.lng }); // Update location in context
      navigate("/mapWithPin"); // Navigate to the map page
    } else {
      console.error("Place details not found");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <div className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm flex items-center">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-gray-500 mr-2"
        />
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={handleInputChange}
          className="flex-grow px-2 py-1 border-none focus:ring-0 focus:outline-none"
        />
      </div>

      {loading && (
        <div className="text-gray-500 mt-2">
          <div className="animate-pulse flex flex-col items-center gap-4 w-60">
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>{" "}
          </div>
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <ul className="bg-white border border-gray-300 mt-2 rounded-md shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelectAddress(suggestion);
              }} // Set selected address
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AddressSearchBar;
