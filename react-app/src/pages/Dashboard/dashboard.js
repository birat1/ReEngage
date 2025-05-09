import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProgress from './components/UserProgress';
import UserStats from './components/UserStats';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfo } from '../../components/Authentication/CheckLoginStatus';
<<<<<<< Updated upstream
import FactAccuracyRow from './components/FactAccuracyRow';
=======
import axios from 'axios';
import { backendAPI } from '../../constants';
>>>>>>> Stashed changes

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentsCount, setStudentsCount] = useState(0);
  const [topStudents, setTopStudents] = useState([]);
  const navigate = useNavigate();

  const colors = {
    primary: '#3473c8',
    secondary: '#5e60ce',
    tertiary: '#4a7aec',  
    lightBg: '#f8f9fa',
    darkText: '#333333',
    lightText: '#6c757d',
    accent: '#6366f1',
    progressBar: '#4f46e5',
    cardBorder: '#e9ecef',
    hoverColor: '#f0f5ff'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserData(userInfo);
        
        if (userInfo.is_admin) {
          try {
            const response = await axios.get(`${backendAPI}api/get-students/`, {
              withCredentials: true
            });
            
            if (response.data && response.data.length > 0) {
              setStudentsCount(response.data.length);
              
              const sortedStudents = [...response.data].sort((a, b) => b.xp - a.xp).slice(0, 3);
              setTopStudents(sortedStudents);
            } else {
              console.log("No students data returned from API");
              setStudentsCount(3);
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
                  science_answered: 100
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
                  science_answered: 100
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
                  science_answered: 100
                }
              ]);
            }
          } catch (error) {
            console.error("Error fetching students:", error);
            setStudentsCount(3);
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
                science_answered: 100
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
                science_answered: 100
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
                science_answered: 100
              }
            ]);
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleContinueLearning = (subjectName) => {
    if (subjectName === 'Science') navigate('/games/labwars');
    else if (subjectName === 'Math') navigate('/games/starmath');
    else if (subjectName === 'English') navigate('/games/fill-itfish');
  };

  if (loading || !userData) {
    return (
      <div 
        className='d-flex align-items-center justify-content-center vh-100'
        style={{ 
          backgroundImage: 'linear-gradient(to bottom right, #f0f5ff, #fff)'
        }}
      >
        <div className='text-center'>
          <div
            className='spinner-border'
            style={{ width: 48, height: 48, color: colors.primary }}
            role='status'
          ></div>
          <h2 className='h4 mt-4' style={{ color: colors.primary }}>Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  const subjectStats = [
    {
      game: 'Lab Wars',
      correct_answers: userData.science_correct,
      total_answers: userData.science_answered,
      percentage: userData.science_percentage,
      type: 'Science',
    },
    {
      game: 'Star Math',
      correct_answers: userData.maths_correct,
      total_answers: userData.maths_answered,
      percentage: userData.maths_percentage,
      type: 'Math',
    },
    {
      game: 'Fill-it Fish',
      correct_answers: userData.english_correct,
      total_answers: userData.english_answered,
      percentage: userData.english_percentage,
      type: 'English',
    },
  ];

<<<<<<< Updated upstream
  console.log("cheching dash " + userData.english_percentage)

  return (
    <div className='container py-4'>
      <UserStats userData={userData} />
      <UserProgress
          subjectStats={subjectStats}
          handleContinueLearning={handleContinueLearning}
      />
      <FactAccuracyRow
      englishPercentage={userData.english_percentage}
      mathPercentage={userData.maths_percentage}
      sciencePercentage={userData.science_percentage}
      />
=======
  const isAdmin = userData.is_admin;
  
  const cardStyle = {
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: 'none',
    overflow: 'hidden',
  };

  const sectionHeaderStyle = {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const buttonStyle = {
    fontSize: '14px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
  };

  return (
    <div 
      className='py-4'
      style={{ 
        backgroundColor: '#f0f7ff',
        minHeight: '100vh'
      }}
    >
      <div className='container'>
        <UserStats userData={userData} />
        
        {isAdmin ? (
          <>
            <div 
              className='mb-4 p-4'
              style={{
                ...cardStyle,
                borderTop: `3px solid ${colors.primary}`,
                backgroundImage: `linear-gradient(to right, #ffffff, #f9fbff)`,
              }}
            >
              <div className='d-flex align-items-center mb-3'>
                <div style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}40)`, 
                  padding: '12px', 
                  borderRadius: '12px', 
                  marginRight: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={colors.primary} viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                  </svg>
                </div>
                <div>
                  <h1 className='h4 fw-bold m-0' style={{ 
                    color: colors.darkText,
                    fontSize: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    Admin Dashboard
                  </h1>
                  <p className='mb-0' style={{ 
                    fontSize: '14px', 
                    color: colors.lightText,
                    marginTop: '5px'
                  }}>
                    Manage your students and view their progress
                  </p>
                </div>
              </div>
              
              <div className='row g-3 mt-2'>
                <div className='col-md-6'>
                  <div 
                    className='p-4 rounded h-100' 
                    style={{ 
                      background: `linear-gradient(to right, ${colors.primary}08, ${colors.primary}15)`,
                      borderLeft: `4px solid ${colors.primary}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <button 
                      style={{
                        ...buttonStyle,
                        background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}ee)`,
                        color: 'white'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 10px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.12)';
                      }}
                      onClick={() => navigate('/student-progress')}
                    >
                      <i className="bi bi-bar-chart-line me-2"></i>
                      View Student Progress
                    </button>
                    <p className='mt-3 mb-0 text-center' style={{ fontSize: '13px', color: colors.darkText }}>
                      View detailed performance data for all your students
                    </p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div 
                    className='p-4 rounded h-100' 
                    style={{ 
                      background: `linear-gradient(to right, ${colors.secondary}08, ${colors.secondary}15)`,
                      borderLeft: `4px solid ${colors.secondary}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <button 
                      style={{
                        ...buttonStyle,
                        background: `linear-gradient(to right, ${colors.secondary}, ${colors.secondary}ee)`,
                        color: 'white'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 10px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.12)';
                      }}
                      onClick={() => navigate('/child-register')}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Register New Student
                    </button>
                    <p className='mt-3 mb-0 text-center' style={{ fontSize: '13px', color: colors.darkText }}>
                      Add a new student to your class 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className='mb-4 p-4'
              style={cardStyle}
            >
              <h5 style={sectionHeaderStyle}>
                <i className="bi bi-people-fill" style={{ color: colors.primary }}></i>
                Class Overview
              </h5>
              <div className='row g-3'>
                <div className='col-md-4'>
                  <div 
                    className='p-4 rounded text-center h-100' 
                    style={{ 
                      background: `linear-gradient(135deg, #ffffff, ${colors.primary}10)`,
                      border: `1px solid ${colors.cardBorder}`,
                      borderBottom: `3px solid ${colors.primary}`
                    }}
                  >
                    <div 
                      style={{ 
                        fontSize: '38px', 
                        fontWeight: 'bold', 
                        color: colors.primary,
                        lineHeight: 1.1
                      }}
                    >
                      {studentsCount}
                    </div>
                    <div style={{ fontSize: '14px', color: colors.lightText, marginTop: '6px' }}>
                      <i className="bi bi-mortarboard me-1"></i> Students
                    </div>
                  </div>
                </div>
                
                <div className='col-md-4'>
                  <div 
                    className='p-4 rounded text-center h-100' 
                    style={{ 
                      background: `linear-gradient(135deg, #ffffff, ${colors.secondary}10)`,
                      border: `1px solid ${colors.cardBorder}`,
                      borderBottom: `3px solid ${colors.secondary}`
                    }}
                  >
                    <div 
                      style={{ 
                        fontSize: '38px', 
                        fontWeight: 'bold', 
                        color: colors.secondary,
                        lineHeight: 1.1
                      }}
                    >
                      3
                    </div>
                    <div style={{ fontSize: '14px', color: colors.lightText, marginTop: '6px' }}>
                      <i className="bi bi-controller me-1"></i> Learning Games
                    </div>
                  </div>
                </div>
                
                <div className='col-md-4'>
                  <div 
                    className='p-4 rounded text-center h-100' 
                    style={{ 
                      background: `linear-gradient(135deg, #ffffff, ${colors.tertiary}10)`,
                      border: `1px solid ${colors.cardBorder}`,
                      borderBottom: `3px solid ${colors.tertiary}`
                    }}
                  >
                    <div 
                      style={{ 
                        fontSize: '38px', 
                        fontWeight: 'bold', 
                        color: colors.tertiary,
                        lineHeight: 1.1
                      }}
                    >
                      4
                    </div>
                    <div style={{ fontSize: '14px', color: colors.lightText, marginTop: '6px' }}>
                      <i className="bi bi-layers me-1"></i> Year Groups
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className='mb-4 p-4'
              style={cardStyle}
            >
              <h5 style={sectionHeaderStyle}>
                <i className="bi bi-lightning-charge-fill" style={{ color: colors.accent }}></i>
                Quick Actions
              </h5>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <div 
                    className='p-3 rounded h-100' 
                    style={{ 
                      transition: 'all 0.3s ease',
                      border: `1px solid ${colors.cardBorder}`,
                      background: `linear-gradient(to right, #ffffff, ${colors.primary}08)`,
                      borderLeft: `4px solid ${colors.primary}`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.05)';
                      e.currentTarget.style.background = `linear-gradient(to right, #ffffff, ${colors.primary}15)`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = `linear-gradient(to right, #ffffff, ${colors.primary}08)`;
                    }}
                  >
                    <div className='d-flex align-items-center'>
                      <div 
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: `${colors.primary}15`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <i className="bi bi-trophy" style={{ fontSize: '22px', color: colors.primary }}></i>
                      </div>
                      <div className='ms-3' style={{ flex: 1 }}>
                        <h6 style={{ fontWeight: '600', marginBottom: '4px', color: colors.darkText }}>Leaderboard</h6>
                        <p className='mb-0' style={{ fontSize: '13px', color: colors.lightText }}>
                          See top-performing students
                        </p>
                      </div>
                      <button 
                        className='btn-sm px-3 py-2'
                        style={{
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '500',
                          fontSize: '13px'
                        }}
                        onClick={() => navigate('/leaderboard')}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div 
                    className='p-3 rounded h-100' 
                    style={{ 
                      transition: 'all 0.3s ease',
                      border: `1px solid ${colors.cardBorder}`,
                      background: `linear-gradient(to right, #ffffff, ${colors.secondary}08)`,
                      borderLeft: `4px solid ${colors.secondary}`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.05)';
                      e.currentTarget.style.background = `linear-gradient(to right, #ffffff, ${colors.secondary}15)`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = `linear-gradient(to right, #ffffff, ${colors.secondary}08)`;
                    }}
                  >
                    <div className='d-flex align-items-center'>
                      <div 
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: `${colors.secondary}15`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <i className="bi bi-book" style={{ fontSize: '22px', color: colors.secondary }}></i>
                      </div>
                      <div className='ms-3' style={{ flex: 1 }}>
                        <h6 style={{ fontWeight: '600', marginBottom: '4px', color: colors.darkText }}>Resources</h6>
                        <p className='mb-0' style={{ fontSize: '13px', color: colors.lightText }}>
                          Access educational materials
                        </p>
                      </div>
                      <button 
                        className='btn-sm px-3 py-2'
                        style={{
                          backgroundColor: `${colors.secondary}15`,
                          color: colors.secondary,
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '500',
                          fontSize: '13px'
                        }}
                        onClick={() => navigate('/resources')}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className='mb-4 p-4'
              style={cardStyle}
            >
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h5 style={{ ...sectionHeaderStyle, marginBottom: 0 }}>
                  <i className="bi bi-graph-up" style={{ color: colors.progressBar }}></i>
                  Student Progress
                </h5>
                <button 
                  className='px-3 py-2'
                  style={{
                    backgroundColor: 'transparent',
                    color: colors.progressBar,
                    border: `1px solid ${colors.progressBar}30`,
                    borderRadius: '8px',
                    fontSize: '13px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.progressBar}10`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => navigate('/student-progress')}
                >
                  View all
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
              
              {topStudents.length > 0 ? (
                <div className='mt-3'>
                  {topStudents.map((student, index) => (
                    <div 
                      key={student.user.id} 
                      className='rounded p-3 mb-2'
                      style={{
                        background: index === 0 
                          ? `linear-gradient(to right, #fff8e1, #ffffff)`
                          : '#ffffff',
                        border: `1px solid ${colors.cardBorder}`,
                        borderLeft: index === 0 
                          ? '4px solid #FFD700' 
                          : index === 1 
                            ? '4px solid #C0C0C0' 
                            : index === 2 
                              ? '4px solid #CD7F32'
                              : '4px solid #e0e0e0',
                      }}
                    >
                      <div className='d-flex align-items-center'>
                        <div 
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: index === 0 
                              ? '#FFD700' 
                              : index === 1 
                                ? '#C0C0C0' 
                                : index === 2 
                                  ? '#CD7F32'
                                  : '#e0e0e0',
                            color: index === 0 ? '#5F4B00' : '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginRight: '12px'
                          }}
                        >
                          {index + 1}
                        </div>
                        <div style={{ flex: '1' }}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h6 className='mb-0' style={{ fontWeight: '600' }}>
                              {student.firstname} {student.surname}
                            </h6>
                            <span style={{ 
                              color: colors.primary, 
                              fontWeight: '600',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <i className="bi bi-star-fill" style={{ 
                                color: index === 0 ? '#FFD700' : colors.primary,
                                fontSize: '12px'
                              }}></i>
                              {student.xp} XP
                            </span>
                          </div>
                          <div className='mt-2' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ 
                              flex: 1, 
                              height: '8px', 
                              backgroundColor: '#f0f0f0', 
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div 
                                style={{ 
                                  width: `${Math.round((
                                    student.english_correct + 
                                    student.maths_correct + 
                                    student.science_correct) / (
                                    student.english_answered + 
                                    student.maths_answered + 
                                    student.science_answered) * 100) || 0}%`, 
                                  height: '100%', 
                                  background: `linear-gradient(to right, ${colors.primary}, ${colors.progressBar})`, 
                                  borderRadius: '4px',
                                  transition: 'width 1s ease-in-out'
                                }} 
                              />
                            </div>
                            <span style={{ 
                              fontSize: '12px', 
                              color: colors.darkText,
                              fontWeight: '500'
                            }}>
                              {Math.round((
                                student.english_correct + 
                                student.maths_correct + 
                                student.science_correct) / (
                                student.english_answered + 
                                student.maths_answered + 
                                student.science_answered) * 100) || 0}%
                              <span className='ms-1' style={{ 
                                fontSize: '11px', 
                                color: colors.lightText,
                                fontWeight: 'normal'
                              }}>accuracy</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className='text-center p-4 rounded'
                  style={{ 
                    backgroundColor: '#fafafa',
                    color: colors.lightText,
                    border: `1px dashed ${colors.cardBorder}`
                  }}
                >
                  <i className="bi bi-info-circle mb-2" style={{ fontSize: '24px', display: 'block' }}></i>
                  <p className='mb-0'>No student data available</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <UserProgress
            subjectStats={subjectStats}
            handleContinueLearning={handleContinueLearning}
          />
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
}