import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from './components/Tabs';
import ProgressTab from './components/ProgressTab';
import DailyLearningTab from './components/DailyLearningTab';
import AchievementsTab from './components/AchievementsTab';
import UserStats from './components/UserStats';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfo } from '../../components/Authentication/CheckLoginStatus';

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
      game: 'Lab Wars',
      correct_answers: userData.science_correct,
      total_answers: userData.science_answered,
      type: 'Science',
    },
    {
      game: 'Star Math',
      correct_answers: userData.maths_correct,
      total_answers: userData.maths_answered,
      type: 'Math',
    },
    {
      game: 'Fill-it Fish',
      correct_answers: userData.english_correct,
      total_answers: userData.english_answered,
      type: 'English',
    },
  ];

  return (
    <div className='container py-4'>
      <UserStats userData={userData} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'progress' && (
        <ProgressTab
          subjectStats={subjectStats}
          handleContinueLearning={handleContinueLearning}
        />
      )}
      {activeTab === 'daily' && <DailyLearningTab userData={userData} />}
      {activeTab === 'achievements' && <AchievementsTab />}
    </div>
  );
}