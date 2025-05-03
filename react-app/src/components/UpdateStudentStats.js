import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { backendAPI } from '../constants';

export function useUpdateStudentStats({ points, subject, questions, correctQuestions }) {
  // fetch logged-in user info
  const { data: userInfo } = useQuery({
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

  //fetch current student data
  const { data: studentData, isPending: isUpdating } = useQuery({
    queryKey: ["StudentCurrentData", userInfo?.id],
    queryFn: async () => {
      if (!userInfo?.id || userInfo?.is_admin) return null;
      const response = await fetch(`${backendAPI}api/students/${userInfo.id}/`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch student data");
      return await response.json();
    },
    enabled: !!userInfo && !userInfo?.is_admin,
  });

  // update student data mutation
  const { mutate: updateStudentData } = useMutation({
    mutationFn: async (updateData) => {
      //getting csrf token
      const csrfResponse = await fetch(`${backendAPI}api/csrf/`, {
        credentials: "include"
      });
      const { csrfToken } = await csrfResponse.json();
  
      const response = await fetch(`${backendAPI}api/students/${userInfo.id}/edit/`, {
        method: "PUT",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error("Failed to update student data");
      return await response.json();
    }
  });

  // trigger update when data is available
  useEffect(() => {
    if (studentData && !userInfo?.is_admin) {
      const updateData = {
        points: (studentData.points || 0) + parseInt(points),
        [`${subject}_answered`]: (studentData[`${subject}_answered`] || 0) + questions,
        [`${subject}_correct`]: (studentData[`${subject}_correct`] || 0) + correctQuestions,
        xp: (studentData.xp || 0) + parseInt(points),
      };
      updateStudentData(updateData);
    }
  }, [studentData, points, questions, correctQuestions, subject, userInfo?.is_admin]);

  return { isUpdating };
}