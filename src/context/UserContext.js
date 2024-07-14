import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.errorCode === 0) {
      let groupWithRoles = response.data.groupWithRoles;
      let email = response.data.email;
      let username = response.data.username;
      let token = response.data.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: {
          email,
          username,
          groupWithRoles,
        },
      };
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
