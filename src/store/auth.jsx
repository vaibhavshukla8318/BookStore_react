// This is use for storing a token on localstorage
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;
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
       setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('user data ', data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }
      else{
        console.log('Error fetching user data');
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  }

  // get Services from the backend
  const getServices = async () =>{
       
      try {

        const response = await fetch(`${API}/api/data/service`, {
          method: 'GET'
        })
        if(response.ok){
          const data = await response.json();
          // console.log('Services data: ', data.msg);
          setServices(data.msg);
        }
      } catch (error) {
        console.log(`Error is coming from frontend services: ${error}`)
      }
  }


  // get books from the backend
  const getBooks = async () =>{
       
    try {

      const response = await fetch(`${API}/api/bookstore/books`, {
        method: 'GET'
      })
      if(response.ok){
        const data = await response.json();
        // console.log('books data: ', data.msg);
        setBooks(data.msg);
      }
    } catch (error) {
      console.log(`Error is coming from frontend services: ${error}`)
    }
}

  useEffect(()=>{
    userAuthentication();
    getServices();
    getBooks();
  }, [])


   return (
     <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, books, authorizationToken, isLoading, API }}>
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