import React from 'react';

export default function Tabs({ activeTab, setActiveTab }) {
  return (
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
          className={`nav-link ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </li>
    </ul>
  );
}