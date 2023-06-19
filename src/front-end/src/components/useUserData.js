import React, { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./useAuth";
import { API_URL } from "../const";
import axios from "axios";

const userDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const auth = useAuth();

  useEffect(() => {
    if (auth.token) {
      getUser();
    }
  }, [auth]);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  };

  const getUser = async () => {
    fetchUsername(auth.token)
      .then((username) => setUsername(username))
      .catch((error) => console.error("Error fetching username:", error));
  };

  return (
    <userDataContext.Provider value={username}>
      {children}
    </userDataContext.Provider>
  );
};

export default function useUserData() {
  return useContext(userDataContext);
}
