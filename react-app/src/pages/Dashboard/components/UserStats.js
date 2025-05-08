import React from 'react';
import { Trophy } from 'lucide-react';

export default function UserStats({ userData }) {
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
          <div className='d-flex align-items-center'>
            <div className='bg-warning bg-opacity-25 p-2 rounded-circle'>
              <Trophy size={32} className='text-warning' />
            </div>
            <div className='ms-2'>
              <h2 className='h5 mb-1'>Level {userData.level}</h2>
              <div className='text-muted small'>
                XP: {userData.xp} | Points: {userData.points} | Streak: {userData.streak} days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}