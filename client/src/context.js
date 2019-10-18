import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const authHook = useState(localStorage.getItem('token') || false);

  return (
    <AuthContext.Provider value={authHook}>
      {props.children}
    </AuthContext.Provider>
  )
}
