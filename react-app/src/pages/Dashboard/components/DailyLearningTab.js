import React from 'react';
import { Brain, Star, BarChart3 } from 'lucide-react';

export default function DailyLearningTab({ userData }) {
  return (
    <>
      <div className='bg-white shadow-sm p-4 mb-4 rounded'>
        <div className='d-flex align-items-center mb-3'>
          <Brain size={24} className='text-primary me-2' />
          <h5 className='mb-0'>Daily Tasks</h5>
        </div>
        <div className='list-group mb-3'>
          <label className='list-group-item d-flex align-items-center'>
            <input type='checkbox' checked={true} className='form-check-input me-2' readOnly />
            <span className='text-decoration-line-through text-muted'>Complete Science Quiz</span>
            <span className='badge bg-success ms-auto'>+5 XP</span>
          </label>
        </div>
        <div className='text-center'>
          <button className='dashboard-btn'>Get More Tasks</button>
        </div>
      </div>
    </>
  );
}