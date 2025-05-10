import { backendAPI } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export function useCheckAdmin() {
    const { data: userInfo, isLoading, error } = useQuery({
      queryKey: ["UserInfo"],
      queryFn: async () => {
        const response = await fetch(`${backendAPI}api/current-user-info/`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user info");
        return false; // return false if the user is not logged in
      },
      retry: false,
    });
  
    const isAdmin = userInfo?.is_admin ? userInfo : false; // if the user is an admin, return the user info, otherwise return false

    return {isAdmin, isLoading, error};
  }
