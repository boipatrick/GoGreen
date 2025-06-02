import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]); 

  return (
    <UserContext.Provider value={{
      users, setUsers,
      currentUser, setCurrentUser,
      myEvents, setMyEvents
    }}>
      {children}
    </UserContext.Provider>
  );
}