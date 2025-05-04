import { backendAPI } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export function useCheckAdmin() {
    const { data: userInfo, isLoading } = useQuery({
      queryKey: ["UserInfo"],
      queryFn: async () => {
        const response = await fetch(`${backendAPI}api/current-user-info/`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user info");
        return await response.json();
      },
      retry: false,
    });
  
    const isAdmin = userInfo?.is_admin ? userInfo : false;

    return {isAdmin, isLoading};
  }
