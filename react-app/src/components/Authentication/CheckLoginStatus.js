import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendAPI } from '../../constants';

// Hook to check login status
export function useAuthStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const response = await axios.get(`${backendAPI}api/current-user-info/`, { withCredentials: true });
          if (response.status === 200 && response.data.username) {
            setIsLoggedIn(true);
            setUserName(response.data.username);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          setIsLoggedIn(false);
        } finally {
          setIsLoading(false);
        }
      };
  
      checkLoginStatus();
    }, []);
  
    return { isLoggedIn, userName, isLoading };
}


// wrap this function around the code in return. 
// if the user is logged in, that code is returned. if not, the user is redirected to the error page.
export function CheckLoggedIn({ children }) {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = useAuthStatus();
  
    if (isLoading) return null; // Show nothing while loading
  
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return null;
    }
  
    return children; // Render children if logged in
}

// example use:
// return ( 
//   <CheckLoggedIn>
//     <Your main game/content here />
//   </CheckLoggedIn>
// );