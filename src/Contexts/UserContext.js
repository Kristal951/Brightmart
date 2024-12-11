
import React, { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    email: '',
    // phoneNumber: '',
    imgUrl: '',
  });

  const value = {
    userDetails,
    setUserDetails,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};