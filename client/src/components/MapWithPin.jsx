import { useContext, useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { AppContext } from "../context/AppContext";
import AdressForm from "./AdressForm";
// Define the libraries array outside the component to avoid reloading the script
const libraries = ["places"];

const MapWithPin = () => {
  const { location, setLocation, address, setAddress } = useContext(AppContext);
  const [map, setMap] = useState(null); // Store the map instance

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_API_KEY}`, // Replace with your API key
    libraries, // Use the static libraries array
  });

  useEffect(() => {
    if (location.lat && location.lng && map) {
      map.setCenter(location); // Center the map at the new location
      map.setZoom(15);
    }
  }, [location, map]);

  const handlePinDragEnd = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLocation(newLocation); // Update location in context
    reverseGeocode(newLocation); // Fetch address for the new pin location
  };

  const locateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation); // Update location in context
          reverseGeocode(userLocation); // Fetch address for the current location
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const reverseGeocode = async (location) => {
    const { lat, lng } = location;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address); // Update the address state
      } else {
        setAddress("Address not found");
      }
    } catch (err) {
      console.error("Error reverse geocoding:", err);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="relative w-full h-[400px] mt-6">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={location}
        zoom={15}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        <Marker
          position={location}
          draggable
          onDragEnd={handlePinDragEnd} // Update pin location
        />
      </GoogleMap>

      {/* Locate Me Button */}
      <button
        onClick={locateMe}
        className="absolute bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600"
      >
        Locate Me
      </button>

      {/* Display Selected Address */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-md shadow-lg">
        <p className="text-gray-800 font-semibold">Selected Address:</p>
        <p className="text-red-600 text-lg font-semibold">{address}</p>
      </div>
      <AdressForm />
    </div>
  );
};

export default MapWithPin;
