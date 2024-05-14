import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
const INITIAL_STATE = {
  user: {
    _id: "660ef80a45b361ea96d27d0b",
    username: "Megumi",
    email: "megumiFushiguro@gmail.com",
    profilePicture: "Fushiguro.jpeg",
    coverPicture: "coverImg.jpeg",
    followers: [],
    following: [],
    city: "Tokyo",
    from: "Japan",
    isAdmin: "false",
    relationship: "Grade 1 Sorcerer",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
