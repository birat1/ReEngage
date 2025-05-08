import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from './components/Tabs';
import ProgressTab from './components/ProgressTab';
import DailyLearningTab from './components/DailyLearningTab';
import AchievementsTab from './components/AchievementsTab';
import UserStats from './components/UserStats';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfo } from '../../components/Authentication/CheckLoginStatus';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
};

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserData(userInfo);
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

  const subjectStats = [
    {
      name: 'LabWars',
      correct: userData.science_correct,
      answered: userData.science_answered,
      icon: 'Flask',
      original: 'Science',
    },
    {
      name: 'StarMath',
      correct: userData.maths_correct,
      answered: userData.maths_answered,
      icon: 'Calculator',
      original: 'Math',
    },
    {
      name: 'Fill-itFish',
      correct: userData.english_correct,
      answered: userData.english_answered,
      icon: 'BookOpen',
      original: 'English',
    },
  ];

  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Minutes Spent Learning',
        data: [25, 30, 20, 35, 15, 40, 10],
        backgroundColor: '#0d6efd',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Your Learning Time This Week' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Minutes' },
      },
    },
  };

  return (
    <div className='container py-4'>
      <UserStats userData={userData} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'progress' && (
        <ProgressTab
          subjectStats={subjectStats}
          chartData={chartData}
          chartOptions={chartOptions}
          handleContinueLearning={handleContinueLearning}
        />
      )}
      {activeTab === 'daily' && <DailyLearningTab userData={userData} />}
      {activeTab === 'achievements' && <AchievementsTab />}
    </div>
  );
}