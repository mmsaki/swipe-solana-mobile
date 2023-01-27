import React, {createContext, useContext} from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  const AuthProvider = ({ children }) => { 
    const singInWithPantom = async () => {
      // ...
    };
  }

  return (
    <AuthContext.Provider
      value={{ user: "meek" }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}