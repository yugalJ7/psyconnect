import React, { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  console.log(error);
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
            className="loginBox h-80 p-6 bg-white rounded-xl flex flex-col justify-between"
          >
            <input
              type="email"
              placeholder="Email"
              required
              ref={email}
              className="loginInput h-12 rounded-lg border-2 text-lg pl-5 focus:outline-none"
            />
            <input
              type="password"
              required
              minLength={"6"}
              ref={password}
              placeholder="Password"
              className="loginInput h-12 rounded-lg border-2 text-lg pl-5 focus:outline-none"
            />
            <button
              disabled={isFetching}
              className="loginButton h-12 rounded-lg border-none bg-violet-700 text-white font-medium text-xl disabled:cursor-not-allowed cursor-pointer"
            >
              {isFetching ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForget text-center text-violet-700">
              Forgot Password?
            </span>
            <button className="loginRegisterButton h-12 rounded-lg border-none bg-emerald-600 text-white font-medium text-xl cursor-pointer">
              {isFetching ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
