import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
export default function Login() {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          console.log(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Login Successfull");
        } else {
          toast.error("error");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Sign In Successfull");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Error arise" + error.message);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="relative bg-white p-10 rounded-xl"
      >
        <h1 className="text-2xl text-center text-neutral-700 font-medium mb-3">
          {state === "Login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center">
          Wlecome back! Please {state === "Login" ? "Login" : "Sign Up"} to
          continue
        </p>
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <FontAwesomeIcon icon={faUser} className="w-5" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Enter Your Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <FontAwesomeIcon icon={faEnvelope} className="w-5" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Enter Your Email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <FontAwesomeIcon icon={faLock} className="w-5" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password
        </p>
        <button className="bg-blue-600 text-white w-full py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Dont have an account?{" "}
            <span
              onClick={() => setState("Signup")}
              className="text-blue-600 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              Login In
            </span>
          </p>
        )}
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-5 right-5  cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </form>
    </div>
  );
}
