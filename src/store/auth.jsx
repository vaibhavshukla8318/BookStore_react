// This is use for storing a token on localstorage

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;

   const storeTokenInLS = (serverToken) =>{
    setToken(serverToken);
      return localStorage.setItem("token", serverToken);
   };

   let isLoggedIn = !!token;
   console.log("isLoggedIn", isLoggedIn)
  //  Logout Functionality
  const LogoutUser = () => {
     setToken("");
    return  localStorage.removeItem("token");
  }

  // JWT authentication - to get the currently loggedIn user data

  const userAuthentication = async () => {
    
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('user data ', data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  }

  // get Services from the backend
  const getServices = async () =>{
      try {

        const response = await fetch('http://localhost:3000/api/data/service', {
          method: 'GET'
        })
        if(response.ok){
          const data = await response.json();
          console.log('Services data: ', data.msg);
          setServices(data.msg);
        }
      } catch (error) {
        console.log(`Error is coming from frontend services: ${error}`)
      }
  }

  useEffect(()=>{
    userAuthentication();
    getServices();
  }, [])


   return (
     <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken }}>
        {children}
     </AuthContext.Provider>
   )
}



// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
  const authContextValue = useContext(AuthContext);
  if(!authContextValue){
    throw new Error("useAuth must be used outside of the provider");
  }
  return authContextValue;
}