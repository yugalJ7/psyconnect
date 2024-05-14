import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login w-screen h-screen flex items-center justify-center bg-violet-100">
      <div className="loginWrapper w-8/12 h-4/6 flex">
        <div className="loginLeft flex-1 flex flex-col justify-center">
          <h3 className="loginLogo font-extrabold text-5xl text-violet-700 mb-2">
            psyConnect
          </h3>
          <span className="loginDesc text-2xl">
            Connect with friends and the world around you on psyConnect.
          </span>
        </div>
        <div className="loginRight flex-1 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="loginBox h-[26rem] p-6 bg-white rounded-xl flex flex-col justify-between"
          >
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput h-12 rounded-lg border-2 text-lg pl-5 focus:outline-none"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="loginInput h-12 rounded-lg border-2 text-lg pl-5 focus:outline-none"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              minLength={6}
              className="loginInput h-12 rounded-lg border-2 text-lg pl-5 focus:outline-none"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              type="password"
              className="loginInput h-12 rounded-lg border-2 text-lg pl-5 focus:outline-none"
            />
            <button
              type="submit"
              className="loginButton h-12 rounded-lg border-none bg-violet-700 text-white font-medium text-xl cursor-pointer"
            >
              Sign Up
            </button>
            <button className="loginRegisterButton h-12 rounded-lg border-none bg-emerald-600 text-white font-medium text-xl cursor-pointer">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
