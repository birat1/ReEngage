import React from 'react';
import { Calculator, Flask, BookOpen } from 'lucide-react';

export default function AchievementsTab() {
  return (
    <div className='row'>
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
    </div>
  );
}