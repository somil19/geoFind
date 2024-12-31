import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LocationModal from "./LocationModal";
import Login from "./Login";
export default function Home() {
  const { showLogin, token } = useContext(AppContext);

  return showLogin && !token ? (
    <Login />
  ) : (
    <div className="  h-screen">
      <h1 className="text-4xl text-center">Welcome to GeoFind</h1>
      <p className="text-4xl text-center text-blue-500">HOME</p>
      <LocationModal />
    </div>
  );
}
