import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProgress from "./components/UserProgress";
import UserStats from "./components/UserStats";
import AdminDashboardHeader from "./components/AdminDashboardHeader";
import AdminClassOverview from "./components/AdminClassOverview";
import AdminQuickActions from "./components/AdminQuickActions";
import AdminTopStudentsList from "./components/AdminTopStudentsList";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getUserInfo,
  checkDailyStreak,
} from "../../components/Authentication/CheckLoginStatus";
import FactAccuracyRow from "./components/FactAccuracyRow";
import axios from "axios";
import { backendAPI } from "../../constants";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentsCount, setStudentsCount] = useState(0);
  const [topStudents, setTopStudents] = useState([]);
  const [yearGroups, setYearGroups] = useState(0);
  const navigate = useNavigate();

  const colors = {
    primary: "#3473c8",
    secondary: "#5e60ce",
    tertiary: "#4a7aec",
    lightBg: "#f8f9fa",
    darkText: "#333333",
    lightText: "#6c757d",
    accent: "#6366f1",
    progressBar: "#4f46e5",
    cardBorder: "#e9ecef",
    hoverColor: "#f0f5ff",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      // Check daily streak first to ensure it's updated before we get user data
      await checkDailyStreak();

      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserData(userInfo);

        if (userInfo.is_admin) {
          try {
            const response = await axios.get(`${backendAPI}api/get-students/`, {
              withCredentials: true,
            });

            if (response.data && response.data.length > 0) {
              setStudentsCount(response.data.length);

              const sortedStudents = [...response.data]
                .sort((a, b) => b.xp - a.xp)
                .slice(0, 3);
              setTopStudents(sortedStudents);

              //counting the number of year groups
              const yearGroups = new Set();
              for (const student of response.data) {
                yearGroups.add(student.year);
              }
              setYearGroups(yearGroups.size);


            } else {
              console.log("No students data returned from API");
              setStudentsCount(0);
              setYearGroups(0);
              setTopStudents([]);
            }
          } catch (error) {
            console.error("Error fetching students:", error);
            setStudentsCount(3);
            setYearGroups(3);
            setTopStudents([
              {
                user: { id: 1 },
                firstname: "Student 1",
                surname: "",
                xp: 500,
                english_correct: 80,
                maths_correct: 70,
                science_correct: 90,
                english_answered: 100,
                maths_answered: 100,
                science_answered: 100,
              },
              {
                user: { id: 2 },
                firstname: "Student 2",
                surname: "",
                xp: 400,
                english_correct: 70,
                maths_correct: 60,
                science_correct: 80,
                english_answered: 100,
                maths_answered: 100,
                science_answered: 100,
              },
              {
                user: { id: 3 },
                firstname: "Student 3",
                surname: "",
                xp: 300,
                english_correct: 60,
                maths_correct: 50,
                science_correct: 70,
                english_answered: 100,
                maths_answered: 100,
                science_answered: 100,
              },
            ]);
          }
        }
      }
      setLoading(false);
    };

    if (localStorage.getItem("reloadDashboard") === "true") {
      localStorage.removeItem("reloadDashboard");
      window.location.reload();
    }

    fetchUserData();
  }, []);

  const handleContinueLearning = (subjectName) => {
    if (subjectName === "Science") navigate("/games/labwars");
    else if (subjectName === "Math") {
      navigate("/games/starmath");
      localStorage.setItem("reloadStarMath", "true");
    } else if (subjectName === "English") navigate("/games/fill-itfish");
  };

  if (loading || !userData) {
    return (
      <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #f0f5ff, #fff)",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{ width: 48, height: 48, color: colors.primary }}
            role="status"
          ></div>
          <h2 className="h4 mt-4" style={{ color: colors.primary }}>
            Loading your dashboard...
          </h2>
        </div>
      </div>
    );
  }

  const subjectStats = [
    {
      game: "Lab Wars",
      correct_answers: userData.science_correct,
      total_answers: userData.science_answered,
      percentage: userData.science_percentage,
      type: "Science",
    },
    {
      game: "Star Math",
      correct_answers: userData.maths_correct,
      total_answers: userData.maths_answered,
      percentage: userData.maths_percentage,
      type: "Math",
    },
    {
      game: "Fill-it Fish",
      correct_answers: userData.english_correct,
      total_answers: userData.english_answered,
      percentage: userData.english_percentage,
      type: "English",
    },
  ];

  const isAdmin = userData.is_admin;

  return (
    <div
      className="py-4"
      style={{
        backgroundColor: "#f0f7ff",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <UserStats userData={userData} isAdmin={isAdmin} />

        {isAdmin ? (
          <>
            <div
              className="mb-2 p-4 rounded shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <AdminDashboardHeader colors={colors} />
            </div>
            <div
              className="mb-2 p-4 rounded shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <AdminClassOverview
                studentsCount={studentsCount}
                colors={colors}
                yearGroups = {yearGroups}
              />
            </div>
            <div
              className="mb-2 p-4 rounded shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <AdminQuickActions colors={colors} />
            </div>
            {studentsCount > 0 && (
             <div
              className="mb-2 p-4 rounded shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <AdminTopStudentsList topStudents={topStudents} colors={colors} />
            </div>
            )}
          </>
        ) : (
          <>
            <UserProgress
              subjectStats={subjectStats}
              handleContinueLearning={handleContinueLearning}
            />
            <FactAccuracyRow
              englishPercentage={userData.english_percentage}
              mathPercentage={userData.maths_percentage}
              sciencePercentage={userData.science_percentage}
              english_correct = {userData.english_correct}
              maths_correct = {userData.maths_correct}
              science_correct  = {userData.science_correct}
              english_answered  = {userData.english_answered}
              maths_answered  = {userData.maths_answered}
              science_answered  = {userData.science_answered}
            />
          </>
        )}
      </div>
    </div>
  );
}
