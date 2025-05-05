import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { backendAPI } from '../constants';

// wrap this function around the code in return. 
// if the user is logged in, that code is returned. if not, the user is redirected to the error page.
export default function CheckLoggedIn({ children }) {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await fetch(`${backendAPI}api/current-user-info/`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    setIsLoggedIn(false);
                    navigate("/login", { replace: true });
                } else {
                    setIsLoggedIn(true);
                    setIsReady(true);
                }
            } catch (error) {
                console.error('Error checking logged in status:', error);
                navigate("/403", { replace: true });
            }
        }

        checkLogin();
    }, [navigate]);

    if (!isReady) return null;

    return children;
}

// example use:
// return ( 
//   <CheckLoggedIn>
//     <Your main game/content here />
//   </CheckLoggedIn>
// );