import React from 'react';
import { Trophy } from 'lucide-react';

export default function UserStats({ userData }) {
  return (
    <div className='mb-4 bg-white rounded shadow-sm p-4 d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center'>
        <div className='bg-warning bg-opacity-25 p-2 rounded-circle'>
          <Trophy size={32} className='text-warning' />
        </div>
        <div className='ms-3'>
          <h2 className='h5 mb-1'>Level {userData.level}</h2>
          <div>
            XP: {userData.xp} | Points: {userData.points} | Streak: {userData.streak} days
          </div>
        </div>
      </div>
    </div>
  );
}