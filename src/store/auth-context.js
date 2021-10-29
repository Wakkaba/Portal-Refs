import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},

});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("key1");
    if (storedUserInfo === "value1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("key1");
    setIsLoggedIn(false)
  }

  const loginHandler = () => {
    localStorage.setItem("key1", "value1");
    setIsLoggedIn(true)
  }

  return <AuthContext.Provider value={
    {
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler
    }
  }>{props.children}</AuthContext.Provider>
}

export default AuthContext