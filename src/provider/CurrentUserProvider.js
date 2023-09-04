import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const CurrentUserContext = createContext();
const useCurrentUser = () => useContext(CurrentUserContext);

// Create the provider component
const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, useCurrentUser, CurrentUserProvider };
