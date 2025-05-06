import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { backendAPI } from '../constants';

/*How to use if this function is triggered by a button in your code, 
then use like this->
Eg: 
function doSomething() {
  const updateStats = useUpdateStudentStats();
  updateStats(score * 100, "english", 3, score);
  };

if not then, you need a use effect->
Eg:
const updateStats = useUpdateStudentStats();
  useEffect(() => {
    updateStats(points, "maths", questions, correctQuestions);
  }, []);
 ->*/

export function useUpdateStudentStats() {
  const queryClient = useQueryClient();

  // Fetch user info
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

  // Fetch student data
  const { data: studentData } = useQuery({
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

  const { mutate } = useMutation({
    mutationFn: async (updateData) => {
      // console.log("Sending data to backend:", updateData);
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["StudentCurrentData", userInfo?.id]);
    }
  });

  // Return a callback function
  function updateStats(points, subject, questions, correctQuestions) {
    if (!studentData || userInfo?.is_admin) return;

    const updateData = {
      points: (studentData.points || 0) + parseInt(points),
      [`${subject}_answered`]: (studentData[`${subject}_answered`] || 0) + questions,
      [`${subject}_correct`]: (studentData[`${subject}_correct`] || 0) + correctQuestions,
      xp: (studentData.xp || 0) + parseInt(points),
    };

    // console.log("Updating stats with data:", updateData);
    mutate(updateData);
  }

  return updateStats;
}
