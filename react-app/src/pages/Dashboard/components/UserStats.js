import React from 'react';
import { Trophy, Flame } from 'lucide-react';

export default function UserStats({ userData }) {
  // Calculate XP progress for current level
  const xpForCurrentLevel = userData.xp % 100;
  const xpProgress = xpForCurrentLevel;
  const xpNeeded = 100;

  return (
    <div className='mb-4 bg-white rounded shadow-sm p-4'>
      {/* Greeting Section */}
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <div>
          <h1 className='h4 fw-bold'>
            Welcome back, {userData.first_name} <span role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className='text-muted mb-0'>Ready to achieve great things today?</p>
        </div>

        {/* Stats Section */}
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center me-4'>
            <div className='bg-warning bg-opacity-25 p-2 rounded-circle'>
              <Trophy size={32} className='text-warning' />
            </div>
            <div className='ms-2'>
              <h2 className='h5 mb-1'>Level {userData.level}</h2>
              {/* XP Progress Bar */}
              <div className='mb-1 w-100' style={{ height: '8px', backgroundColor: '#e0f2f7', borderRadius: '4px' }}>
                <div 
                  style={{ 
                    width: `${xpProgress}%`, 
                    height: '100%', 
                    backgroundColor: '#5e60ce', 
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
                  }} 
                />
              </div>
              <div className='text-muted small'>
                XP: {userData.xp} ({xpForCurrentLevel}/{xpNeeded} to next level) | Points: {userData.points}
              </div>
            </div>
          </div>
          
          {/* Daily Streak Counter */}
          <div className='d-flex align-items-center'>
            <div className='p-2 rounded-circle' style={{ 
              background: 'linear-gradient(135deg, #ffefcc, #ffcc80)',
            }}>
              <Flame size={32} className='text-danger' />
            </div>
            <div className='ms-2'>
              <h2 className='h5 mb-1'>Daily Streak</h2>
              <div className='fw-bold' style={{ 
                color: '#ff6d00',
                fontSize: '1.2rem',
                textShadow: '0 1px 2px rgba(255, 109, 0, 0.2)'
              }}>
                {userData.streak} {userData.streak === 1 ? 'day' : 'days'}
              </div>
              <div className='text-muted small'>
                Keep learning daily!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}