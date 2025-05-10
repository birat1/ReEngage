import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { backendAPI } from '../constants';

/*How to use if this function is triggered by a button in your code, 
then use like this->
Eg: 
function doSomething() {
  const { updateStats, updateStreak } = useUpdateStudentStats();
  updateStats(score * 100, "english", 3, score);
  };

if not then, you need a use effect->
Eg:
const { updateStats } = useUpdateStudentStats();
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
      const response = await axios.get(`${backendAPI}api/current-user-info/`, { 
        withCredentials: true,
      });
      return response.data;
    },
    retry: false,
  });

  // Fetch student data
  const { data: studentData } = useQuery({
    queryKey: ["StudentCurrentData", userInfo?.id],
    queryFn: async () => {
      if (!userInfo?.id || userInfo?.is_admin) return null;
      const response = await axios.get(`${backendAPI}api/students/${userInfo.id}/`, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !!userInfo && !userInfo?.is_admin,
  });

  const { mutate } = useMutation({
    mutationFn: async (updateData) => {
      const csrfResponse = await axios.get(`${backendAPI}api/csrf/`, {
        withCredentials: true,
      });
      const csrfToken = csrfResponse.data.csrfToken;
  
      const response = await axios.put(
        `${backendAPI}api/students/${userInfo.id}/edit/`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["StudentCurrentData", userInfo?.id]);
      localStorage.setItem('reloadDashboard', 'true');
    },
  });

  // Function to update streaks
  function updateStreak(newStreakValue) {
    if (!studentData || userInfo?.is_admin) return;

    const updateData = {
      streak: newStreakValue
    };

    mutate(updateData);
  }

  // Function to increment streak (useful for streak maintenance features)
  function incrementStreak() {
    if (!studentData || userInfo?.is_admin) return;

    const updateData = {
      streak: (studentData.streak || 0) + 1
    };

    mutate(updateData);
  }

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

  return { updateStats, updateStreak, incrementStreak};
}
