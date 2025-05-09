import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendAPI } from '../../constants';

let cachedUserInfo = null;

export async function getUserInfo() {
  try {
    // If we already have user info in cache, return it
    if (cachedUserInfo) return cachedUserInfo;
    
    const response = await axios.get(`${backendAPI}api/current-user-info/`, {
      withCredentials: true
    });
    
    if (response.status === 200) {
      cachedUserInfo = response.data;
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}

// Function to check and update daily streak
export async function checkDailyStreak() {
  try {
    const response = await axios.get(`${backendAPI}api/check-streak/`, {
      withCredentials: true
    });
    
    if (response.status === 200) {
      // If the streak was updated or a milestone was reached, invalidate the cache
      if (response.data.streak_updated || response.data.milestone_reached) {
        cachedUserInfo = null;
        
        // Handle milestone rewards if needed
        if (response.data.milestone_reached) {
          console.log(`Congratulations! You've reached a new streak milestone: ${response.data.current_streak} days!`);
          
          // Here we could trigger reward distribution based on the current streak
          // This would depend on which milestone was reached (3, 7, 14, or 30 days)
        }
      }
      
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error checking daily streak:', error);
    return null;
  }
}

// Clear cache when needed (e.g., on logout)
export function clearUserInfoCache() {
  cachedUserInfo = null;
}

// Hook to check login status
export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userInfo = await getUserInfo();
      if (userInfo && userInfo.username) {
        setIsLoggedIn(true);
        setUserName(userInfo.username);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
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