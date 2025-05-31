import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]); // Array of registered users
  const [currentUser, setCurrentUser] = useState(null); // Logged in user

  return (
    <UserContext.Provider value={{ users, setUsers, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}