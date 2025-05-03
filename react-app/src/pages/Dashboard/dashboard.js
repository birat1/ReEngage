import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  BookOpen,
  Calculator,
  FlaskRoundIcon as Flask,
  Star,
  Trophy,
  Brain,
  BarChart3,
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

// Initialize Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const subjectDisplayNames = {
  Science: 'LabWars',
  Math: 'StarMath',
  English: 'Fill-itFish',
};

const mockUserData = {
  name: 'Alex',
  avatar: 'https://placehold.co/100x100',
  level: 5,
  xp: 1200,
  points: 350,
  streak: 7,
  science_answered: 20,
  science_correct: 16,
  maths_answered: 25,
  maths_correct: 20,
  english_answered: 18,
  english_correct: 15,
  // Add more fields as needed for your UI
};

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await axios.get('/api/user/stats');
        // setUserData(response.data);
        setUserData(mockUserData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handler to navigate to the correct game based on subject
  const handleContinueLearning = (subjectName) => {
    if (subjectName === "Science") navigate("/games/labwars");
    else if (subjectName === "Math") navigate("/games/starmath");
    else if (subjectName === "English") navigate("/games/fill-itfish");
  };

  if (loading || !userData) {
    return (
      <div className='d-flex align-items-center justify-content-center vh-100 bg-light'>
        <div className='text-center'>
          <div
            className='spinner-border text-primary'
            style={{ width: 48, height: 48 }}
            role='status'
          ></div>
          <h2 className='h4 mt-4 text-primary'>Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  // Calculate subject accuracy
  const subjectStats = [
    {
      name: 'LabWars',
      correct: userData.science_correct,
      answered: userData.science_answered,
      icon: Flask,
      original: 'Science',
    },
    {
      name: 'StarMath',
      correct: userData.maths_correct,
      answered: userData.maths_answered,
      icon: Calculator,
      original: 'Math',
    },
    {
      name: 'Fill-itFish',
      correct: userData.english_correct,
      answered: userData.english_answered,
      icon: BookOpen,
      original: 'English',
    },
  ];

  // Example weekly activity (replace with real data if available)
  const chartData = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'Minutes Spent Learning',
        data: [25, 30, 20, 35, 15, 40, 10], // TODO: Replace with real data if available
        backgroundColor: '#0d6efd',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Learning Time This Week',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes',
        },
      },
    },
  };

  return (
    <div className='container py-4'>
      {/* Level and Stats */}
      <div className='mb-4 bg-white rounded shadow-sm p-4 d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <div className='bg-warning bg-opacity-25 p-2 rounded-circle'>
            <Trophy size={32} className='text-warning' />
          </div>
          <div className='ms-3'>
            <h2 className='h5 mb-1'>Level {userData.level}</h2>
            <div>
              XP: {userData.xp} | Points: {userData.points} | Streak:{' '}
              {userData.streak} days
            </div>
          </div>
        </div>
        <button className='dashboard-btn'>View Achievements</button>
      </div>

      {/* Dashboard Tabs */}
      <ul className='nav nav-tabs mb-4 bg-white rounded shadow-sm px-3 pt-3'>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            Progress Tracking
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily Learning
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={`nav-link ${
              activeTab === 'achievements' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </li>
      </ul>

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <>
          <div className='row mb-4'>
            {subjectStats.map((subject) => (
              <div key={subject.name} className='col-md-4 mb-3'>
                <div className='card h-100 shadow-sm'>
                  <div className='card-body'>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                      <h5 className='card-title mb-0'>{subject.name}</h5>
                      <subject.icon size={24} className='text-primary' />
                    </div>
                    <div className='mb-3'>
                      <div className='d-flex justify-content-between small'>
                        <span>
                          {subject.answered > 0
                            ? `${(
                                (subject.correct / subject.answered) *
                                100
                              ).toFixed(1)}% Accuracy`
                            : 'No data yet'}
                        </span>
                        <span>
                          {subject.correct}/{subject.answered} Correct
                        </span>
                      </div>
                      <div className='progress' style={{ height: 8 }}>
                        <div
                          className='progress-bar bg-primary'
                          style={{
                            width:
                              subject.answered > 0
                                ? `${
                                    (subject.correct / subject.answered) * 100
                                  }%`
                                : '0%',
                          }}
                        ></div>
                      </div>
                    </div>
                    {/* You can add feedback or other info here if available */}
                    <div className='d-flex justify-content-center'>
                      <button
                        className='dashboard-btn w-100'
                        onClick={() => handleContinueLearning(subject.original)}
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-white shadow-sm p-4 mb-4 rounded'>
            <h5 className='mb-3'>Weekly Activity</h5>
            <div style={{ height: 300 }}>
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>
        </>
      )}

      {/* Daily Learning Tab */}
      {activeTab === 'daily' && (
        <>
          <div className='bg-white shadow-sm p-4 mb-4 rounded'>
            <div className='d-flex align-items-center mb-3'>
              <Brain size={24} className='text-primary me-2' />
              <h5 className='mb-0'>Daily Tasks</h5>
            </div>
            {/* TODO: Replace with real daily tasks if available */}
            <div className='list-group mb-3'>
              <label className='list-group-item d-flex align-items-center'>
                <input
                  type='checkbox'
                  checked={true}
                  className='form-check-input me-2'
                  readOnly
                />
                <span className='text-decoration-line-through text-muted'>
                  Complete Science Quiz
                </span>
                <span className='badge bg-success ms-auto'>+5 XP</span>
              </label>
              <label className='list-group-item d-flex align-items-center'>
                <input
                  type='checkbox'
                  checked={true}
                  className='form-check-input me-2'
                  readOnly
                />
                <span className='text-decoration-line-through text-muted'>
                  Practice Multiplication
                </span>
                <span className='badge bg-success ms-auto'>+5 XP</span>
              </label>
              <label className='list-group-item d-flex align-items-center'>
                <input
                  type='checkbox'
                  checked={false}
                  className='form-check-input me-2'
                  readOnly
                />
                <span>Read a Story</span>
              </label>
              <label className='list-group-item d-flex align-items-center'>
                <input
                  type='checkbox'
                  checked={false}
                  className='form-check-input me-2'
                  readOnly
                />
                <span>Learn 5 New Words</span>
              </label>
            </div>
            <div className='text-center'>
              <button className='dashboard-btn'>Get More Tasks</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <div className='bg-white shadow-sm p-4 rounded h-100'>
                <div className='d-flex align-items-center mb-2'>
                  <Star size={24} className='text-primary me-2' />
                  <h6 className='mb-0'>Fact of the Day</h6>
                </div>
                <p className='mb-0'>
                  Did you know? The heart of a blue whale is so big that a human
                  could swim through its arteries!
                </p>
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='bg-white shadow-sm p-4 rounded h-100'>
                <div className='d-flex align-items-center mb-2'>
                  <BarChart3 size={24} className='text-primary me-2' />
                  <h6 className='mb-0'>Learning Streak</h6>
                </div>
                <div className='text-center'>
                  <div className='display-6 text-primary fw-bold'>
                    {userData.streak}
                  </div>
                  <p className='mb-0'>days in a row!</p>
                  <p className='text-muted small mt-2'>
                    Keep it up to earn bonus stars!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <>
          <div className='row'>
            {/* TODO: Replace with real achievements if available */}
            <div className='col-md-4 mb-3'>
              <div className='bg-white shadow-sm p-4 rounded h-100 d-flex align-items-center'>
                <div className='bg-warning bg-opacity-25 p-3 rounded-circle me-3'>
                  <Calculator size={24} className='text-warning' />
                </div>
                <div>
                  <h6 className='mb-1'>Math Wizard</h6>
                  <p className='mb-0 text-muted small'>Earned Yesterday</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 mb-3'>
              <div className='bg-white shadow-sm p-4 rounded h-100 d-flex align-items-center'>
                <div className='bg-warning bg-opacity-25 p-3 rounded-circle me-3'>
                  <Flask size={24} className='text-warning' />
                </div>
                <div>
                  <h6 className='mb-1'>Science Explorer</h6>
                  <p className='mb-0 text-muted small'>Earned 3 days ago</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 mb-3'>
              <div className='bg-white shadow-sm p-4 rounded h-100 d-flex align-items-center'>
                <div className='bg-warning bg-opacity-25 p-3 rounded-circle me-3'>
                  <BookOpen size={24} className='text-warning' />
                </div>
                <div>
                  <h6 className='mb-1'>Reading Star</h6>
                  <p className='mb-0 text-muted small'>Earned 1 week ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center mt-4'>
            <button className='dashboard-btn'>View All Achievements</button>
          </div>
        </>
      )}
    </div>
  );
}
