import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FaFlask, FaCalculator, FaBook } from 'react-icons/fa';
import './ProgressTab.css';

export default function ProgressTab({ subjectStats, chartData, chartOptions, handleContinueLearning }) {
  const getIcon = (subjectName) => {
    switch (subjectName) {
      case 'Science':
        return <FaFlask size={24} className="text-primary" />;
      case 'Math':
        return <FaCalculator size={24} className="text-primary" />;
      case 'English':
        return <FaBook size={24} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='row mb-4'>
        {subjectStats.map((subject) => (
          <div key={subject.name} className='col-md-4 mb-3'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='card-title mb-0'>{subject.name}</h5>
                  {getIcon(subject.original)}
                </div>
                <div className='mb-3'>
                  <div className='d-flex justify-content-between small'>
                    <span>
                      {subject.correct}/{subject.answered} Questions Answered
                    </span>
                    <span>
                      {subject.answered > 0
                        ? `${((subject.correct / subject.answered) * 100).toFixed(1)}%`
                        : 'No data yet'}
                    </span>
                  </div>
                  <div className='progress' style={{ height: 8 }}>
                    <div
                      className='progress-bar bg-primary'
                      style={{
                        width: subject.answered > 0
                          ? `${(subject.correct / subject.answered) * 100}%`
                          : '0%',
                        borderRadius: 4,
                      }}
                    ></div>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <button
                    className='dashboard-btn w-100 hover-animate'
                    style={{ borderRadius: '20px' }}
                    onClick={() => handleContinueLearning(subject.original)}
                  >
                   <span className="me-2">Continue Learning</span>
                   <i className="bi bi-play-circle"></i>
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
  );
}