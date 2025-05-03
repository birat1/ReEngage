import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import "./styles/StudentProgress.css";
// import "./avataaars.png";
import One from "../../avatars/One.png";
import Two from "../../avatars/Two.png";
import Three from "../../avatars/Three.png";
import Four from "../../avatars/Four.png";
import Five from "../../avatars/Five.png";
import Six from "../../avatars/Six.png";
import Default from "../../avatars/Default.png";
import Footer from "../../components/Footer/Footer.js";
import { backendAPI } from "../../constants.js";
import { Navigate } from "react-router-dom";

/*
need to check the student's avatar id and 
match with the avatar name in images
*/

//backup data
const initialStudents = [
  {
    rank: 1,
    name: "Charlie White",
    englishAnswered: 20,
    englishCorrect: 19,
    mathAnswered: 20,
    mathCorrect: 20,
    scienceAnswered: 20,
    scienceCorrect: 19,
    points: 1500,
    xp: 1000,
  },
  {
    rank: 2,
    name: "Alice Brown",
    englishAnswered: 8,
    englishCorrect: 6,
    mathAnswered: 20,
    mathCorrect: 7,
    scienceAnswered: 20,
    scienceCorrect: 20,
    points: 1200,
    xp: 900,
  },
  {
    rank: 3,
    name: "Daisy Black",
    englishAnswered: 20,
    englishCorrect: 15,
    mathAnswered: 5,
    mathCorrect: 0,
    scienceAnswered: 20,
    scienceCorrect: 8,
    points: 1100,
    xp: 850,
  },
  {
    rank: 4,
    name: "Bobby Green",
    englishAnswered: 15,
    englishCorrect: 14,
    mathAnswered: 6,
    mathCorrect: 4,
    scienceAnswered: 20,
    scienceCorrect: 19,
    points: 950,
    xp: 700,
  },
  {
    rank: 5,
    name: "Ethan Grey",
    englishAnswered: 20,
    englishCorrect: 18,
    mathAnswered: 10,
    mathCorrect: 9,
    scienceAnswered: 20,
    scienceCorrect: 8,
    points: 870,
    xp: 650,
  },
];

function StudentProgress() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("xp");
  const [students, setStudents] = useState(initialStudents);
  const [rankedStudents, setRankedStudents] = useState([]);

  //data fetching
  const { isPending, data, error } = useQuery({
    queryKey: ["StudentsData"],
    queryFn: async () => {
      const response = await fetch(`${backendAPI}api/get-students/`, {
        method: "GET",
        credentials: "include",
      });
      return await response.json();
    },
  });

  // fetch logged-in user info
  const {
    isPending: userPending,
    data: userInfo,
    error: userError,
  } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: async () => {
      const response = await fetch(`${backendAPI}api/current-user-info/`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      return await response.json();
    },
    retry: false,
  });

  //updating students state
  useEffect(() => {
    if (data) {
      const transformStudents = async () => {
        const students = Array.isArray(data) ? data : data.students || [];
        const transformed = [];

        for (const student of students) {
          // fetch avatar for each student
          let avatarName = "Default";
          try {
            const response = await fetch(
                `${backendAPI}api/current-equipped-avatar/${student.user.id}/`,
                { credentials: "include" }
            );
            if (response.ok) {
                const avatarData = await response.json();
                console.log("Raw avatar data:", avatarData); // Debug log
                avatarName = avatarData.name;
                console.log("Using avatar:", avatarName); // Debug log
                console.log("Available avatars:", Object.keys(avatarImages)); // Debug log
            } else {
                console.error("Avatar fetch failed:", response.status);
            }
        } catch (error) {
            console.error("Failed to fetch avatar:", error);
        }

          transformed.push({
            ...student,
            name: `${student.firstname} ${student.surname}`,
            englishAnswered: student.english_answered,
            englishCorrect: student.english_correct,
            mathAnswered: student.maths_answered,
            mathCorrect: student.maths_correct,
            scienceAnswered: student.science_answered,
            scienceCorrect: student.science_correct,
            points: student.points,
            xp: student.xp,
            avatar: avatarName,
          });
        }

        setStudents(transformed);
      };

      transformStudents();
    }
  }, [data]);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let sorted = [...filtered];

    switch (sortBy) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "questionsAnswered":
        sorted.sort(
          (a, b) =>
            b.englishAnswered +
            b.mathAnswered +
            b.scienceAnswered -
            (a.englishAnswered + a.mathAnswered + a.scienceAnswered)
        );
        break;
      case "questionsCorrectly":
        sorted.sort(
          (a, b) =>
            b.englishCorrect +
            b.mathCorrect +
            b.scienceCorrect -
            (a.englishCorrect + a.mathCorrect + a.scienceCorrect)
        );
        break;
      case "points":
        sorted.sort((a, b) => b.points - a.points);
        break;
      case "xp":
      default:
        sorted.sort((a, b) => b.xp - a.xp);
        break;
    }
    const ranked = sorted.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

    setRankedStudents(ranked);
  }, [searchTerm, sortBy, students]);

  //redirect if user is not admin or logged in
  if (userPending) {
    return "Loading user information...";
  }

  if (userError) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo?.is_admin) {
    return <Navigate to="/403" replace />;
  }
  if (isPending) return "Loading";
  if (error) return "An error occured here: " + error.message;
  console.log(data);
  console.log("Logged in user:", userInfo);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // avatar mapping
  const avatarImages = {
    'One': One,
    'Two': Two,
    'Three': Three,
    'Four': Four,
    'Five': Five,
    'Six': Six,
    'Default': Default,
  };

  return (
    <div>
      <div className="SPContainer">
        <h2 className="SPTitle">Your Students' Progress Dashboard</h2>

        <div className="controls-container">
          {/*Search Bar*/}
          <div className="SearchBar">
            <input
              type="text"
              placeholder="Search for names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
          </div>

          {/*filter dropdown*/}
          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort by:
            </label>
            <select id="sort-select" value={sortBy} onChange={handleSortChange}>
              <option value="xp">XP</option>
              <option value="name">Name</option>
              <option value="questionsAnswered">Questions Answered</option>
              <option value="questionsCorrectly">
                Questions Answered Correctly
              </option>
              <option value="points">Points</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table id="data-table">
            <thead>
              <tr className="headerRow">
                <th>Rank</th>
                <th>Name</th>
                <th>Questions Answered</th>
                <th>Questions Answered Correctly</th>
                <th>Points</th>
                <th>XP</th>
              </tr>
            </thead>
            <tbody className="dataRows" id="allRows">
              {rankedStudents.map((student, index) => (
                <React.Fragment key={student.name}>
                  <tr
                    className="fullRow"
                    onClick={() => toggleExpand(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {student.rank === 1
                        ? "1 🥇"
                        : student.rank === 2
                        ? "2 🥈"
                        : student.rank === 3
                        ? "3 🥉"
                        : student.rank}
                    </td>
                    <td className="name-cell">
                      <span className="expand-toggle">
                        <img
                          src={
                            avatarImages[student.avatar] || Default
                          }
                          alt="Avatar"
                          className="avatar"
                        />
                        {student.name}
                        <span
                          className={`expand-icon ${
                            expandedIndex === index ? "open" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </span>
                    </td>
                    <td>
                      {student.englishAnswered +
                        student.mathAnswered +
                        student.scienceAnswered}
                    </td>
                    <td>
                      {student.englishCorrect +
                        student.mathCorrect +
                        student.scienceCorrect}
                    </td>
                    <td>{student.points}</td>
                    <td>
                      <div className="xp-bar">
                        <div
                          className="fill"
                          style={{ width: `${student.xp / 10}%` }}
                        ></div>
                      </div>
                      <span>{student.xp} XP</span>
                    </td>
                  </tr>

                  {expandedIndex === index && (
                    <tr>
                      <td colSpan="6" className="hiddenRow">
                        <div className="details-content">
                          <p>
                            <strong>English Game:</strong>{" "}
                            {student.englishCorrect}/{student.englishAnswered}
                          </p>
                          <p>
                            <strong>Math Game:</strong> {student.mathCorrect}/
                            {student.mathAnswered}
                          </p>
                          <p>
                            <strong>Science Game:</strong>{" "}
                            {student.scienceCorrect}/{student.scienceAnswered}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentProgress;
