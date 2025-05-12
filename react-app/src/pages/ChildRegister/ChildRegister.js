import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCheckAdmin } from "./useCheckAdmin";
import "./ChildRegister.css"; // Assuming you have some CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { backendAPI } from "../../constants";

const ChildRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    surname: "",
    year: "",
    managed_by: "",
    english_answered: 0,
    english_correct: 0,
    maths_answered: 0,
    maths_correct: 0,
    science_answered: 0,
    science_correct: 0,
    level: 0,
    points: 0,
    streak: 0,
    xp: 0,
  });

  const { isAdmin, isLoading } = useCheckAdmin();
  const navigate = useNavigate();

  // check if the user is an admin
  useEffect(() => {
      //for reload to mitgate the unathorised user issue
    if (localStorage.getItem("reloadchild-register") === "true") {
      localStorage.removeItem("reloadchild-register");
      window.location.reload();
    }
    if (!isLoading) {
      //console.log("Admin status:", isAdmin);
      if (!isAdmin) {
        alert("You are not authorized to register a child.");
        navigate("/", { replace: true });
      }
    }
  }, [isAdmin, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Selected Admin ID:", isAdmin.id);

    const userData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };

    const studentData = {
      user: userData,
      firstname: formData.firstname,
      surname: formData.surname,
      year: formData.year,
      managed_by: isAdmin?.id,
      english_answered: formData.english_answered,
      english_correct: formData.english_correct,
      maths_answered: formData.maths_answered,
      maths_correct: formData.maths_correct,
      science_answered: formData.science_answered,
      science_correct: formData.science_correct,
      level: formData.level,
      points: formData.points,
      streak: formData.streak,
      xp: formData.xp,
    };
    //console.log("Payload being sent:", studentData);

    // Sends the entire student data to the backend API
    axios
      .post(`${backendAPI}api/students/`, studentData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Child Registered Successfully!");
        setFormData({
          // wipe form data after successful registration
          username: "",
          password: "",
          email: "",
          firstname: "",
          surname: "",
          year: "",
          managed_by: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          let messages = [];

          const extractMessages = (errObj) => {
            for (const key in errObj) {
              const value = errObj[key];
              if (Array.isArray(value)) {
                messages.push(...value);
              } else if (typeof value === "string") {
                messages.push(value);
              } else if (typeof value === "object" && value !== null) {
                extractMessages(value); // Recursively handle nested objects
              } else {
                messages.push(String(value));
              }
            }
          };

          extractMessages(errors);

          alert(messages.join("\n"));
        } else {
          alert("An unexpected error occurred.");
        }
      });
  };

  return (
    <div className="child-register-container">
       <div
      className="boxed row"
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        top: "50px",
        marginTop: "50px",
      }}
    >
      <h2 className="heading2">Register a Child</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="column columns2" style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="firstname">
            First Name:
          </label>
          <input
            type="text"
            id="fn"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="column columns2" style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="surname">
            Surname:
          </label>
          <input
            type="text"
            id="sn"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="column columns2" style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="un"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="column columns2" style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="password">
            Password:
          </label>
          <input
            type="text"
            id="pw"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="column columns2" style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="column columns2" style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="year">
            Year:
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select a year</option>
            {[3, 4, 5, 6].map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label className="lbl-txt lbl-txt2" htmlFor="managed_by">
            Managed By {isAdmin?.username}
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default ChildRegister;
