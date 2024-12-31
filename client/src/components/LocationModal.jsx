// import { useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLocationPinLock,
//   faMagnifyingGlass,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LocationModal = () => {
//   const [isOpen, setIsOpen] = useState(true); // Modal visibility state
//   const { setAddress, backendUrl } = useContext(AppContext); // Access setAddress from context
//   const navigate = useNavigate();
//   // Handle enabling location
//   const enableLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;

//           try {
//             // Call the reverse geocoding API with Axios
//             const response = await axios.post(
//               `${backendUrl}/api/geo/reverse-geocode`,
//               {
//                 latitude,
//                 longitude,
//               }
//             );

//             const { address } = response.data; // Extract the address from the API response
//             setAddress(address); // Update the address in the context
//             setIsOpen(false); // Close the modal
//           } catch (error) {
//             console.error("Error fetching address:", error);
//             alert("Failed to fetch your address. Please try again.");
//           }
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           alert("Could not fetch location. Please try manually searching.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   };

//   // Handle searching manually
//   const searchManually = () => {
//     navigate("/search-address");
//     setIsOpen(false); // Close the modal
//     // Optionally, trigger navigation to manual search page/component
//   };

//   return (
//     isOpen && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className=" bg-white w-96 p-6 rounded-lg shadow-lg">
//           <div className="flex justify-end">
//             <FontAwesomeIcon
//               icon={faXmark}
//               className="   text-gray-600 cursor-pointer"
//               onClick={() => setIsOpen(false)}
//             />
//           </div>
//           <div className="flex items-center justify-center mb-5">
//             <FontAwesomeIcon
//               icon={faLocationPinLock}
//               size="2xl"
//               className="text-red-600 h-20 mx-auto"
//             />
//           </div>
//           <h2 className="text-lg font-semibold mb-2 text-center">
//             Location Permission is off
//           </h2>
//           <p className="text-sm text-gray-600 mb-6 text-center">
//             We need your location to find the nearest store and provide you a
//             seamless delivery experience.
//           </p>
//           <div className="flex flex-col items-center gap-4">
//             <button
//               onClick={enableLocation}
//               className="px-4 py-2 font-semibold bg-red-600 text-white rounded-md hover:bg-red-600 w-full"
//             >
//               Enable Location
//             </button>
//             <button
//               onClick={searchManually}
//               className="px-4 font-semibold py-2 border border-black bg-gray-50 text-red-700 rounded-md hover:bg-gray-100 w-full"
//             >
//               <FontAwesomeIcon icon={faMagnifyingGlass} className="px-2" />
//               Search your Location Manually
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default LocationModal;

import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPinLock,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LocationModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal visibility state
  const { setAddress, setLocation, backendUrl } = useContext(AppContext); // Access setAddress and setLocation from context
  const navigate = useNavigate();

  // Handle enabling location
  const enableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Call the reverse geocoding API with Axios
            const response = await axios.post(
              `${backendUrl}/api/geo/reverse-geocode`,
              {
                latitude,
                longitude,
              }
            );

            const { address } = response.data; // Extract the address from the API response
            setAddress(address); // Update the address in the context
            setLocation({ lat: latitude, lng: longitude }); // Update the location in the context
            setIsOpen(false); // Close the modal

            navigate("/mapWithPin"); // Navigate to the MapWithPin component
          } catch (error) {
            console.error("Error fetching address:", error);
            alert("Failed to fetch your address. Please try again.");
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Could not fetch location. Please try manually searching.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle searching manually
  const searchManually = () => {
    navigate("/search-address");
    setIsOpen(false); // Close the modal
    // Optionally, trigger navigation to manual search page/component
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-gray-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex items-center justify-center mb-5">
            <FontAwesomeIcon
              icon={faLocationPinLock}
              size="2xl"
              className="text-red-600 h-20 mx-auto"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-center">
            Location Permission is off
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            We need your location to find the nearest store and provide you a
            seamless delivery experience.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={enableLocation}
              className="px-4 py-2 font-semibold bg-red-600 text-white rounded-md hover:bg-red-600 w-full"
            >
              Enable Location
            </button>
            <button
              onClick={searchManually}
              className="px-4 font-semibold py-2 border border-black bg-gray-50 text-red-700 rounded-md hover:bg-gray-100 w-full"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="px-2" />
              Search your Location Manually
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LocationModal;
