import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FaFlask, FaCalculator, FaBook } from 'react-icons/fa';
import './UserProgress.css';

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

export default function ProgressTab({ subjectStats, handleContinueLearning }) {
  const colors = {
    Science: '#0d6efd',
    Math: '#ffc107',
    English: '#198754',
  }

  const getIcon = (subjectName) => {
    switch (subjectName) {
      case 'Science':
        return <FaFlask size={24} style={{ color: colors.Science }} />;
      case 'Math':
        return <FaCalculator size={24} style={{ color: colors.Math }} />;
      case 'English':
        return <FaBook size={24} style={{ color: colors.English }} />;
      default:
        return null;
    }
  };

  const chartData = {
    labels: subjectStats.map((subject) => subject.type), 
    datasets: [
      {
        label: 'Total Questions Answered',
        data: subjectStats.map((subject) => subject.total_answers), 
        backgroundColor: subjectStats.map((subject) => colors[subject.type]), 
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total Questions Answered by Subject' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Questions Answered' },
      },
    },
  };

  return (
    <>
      <div className='row mb-4'>
        {subjectStats.map((subject) => (
          <div key={subject.game} className='col-md-4 mb-3'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='card-title mb-0'>{subject.game}</h5>
                  {getIcon(subject.type)}
                </div>
                <div className='mb-3'>
                  <div className='d-flex justify-content-between small'>
                    <span>
                      {subject.correct_answers}/{subject.total_answers} Questions Answered
                    </span>
                    <span>
                      {subject.total_answers > 0
                        ? `${((subject.correct_answers / subject.total_answers) * 100).toFixed(1)}%`
                        : 'No data yet'}
                    </span>
                  </div>
                  <div className='progress' style={{ height: 8 }}>
                    <div
                      className='progress-bar'
                      style={{
                        width: subject.total_answers > 0
                          ? `${(subject.correct_answers / subject.total_answers) * 100}%`
                          : '0%',
                        backgroundColor: colors[subject.type],
                        borderRadius: 4,
                      }}
                    ></div>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <button
                    className='dashboard-btn w-100 hover-animate'
                    style={{ borderRadius: '20px' }}
                    onClick={() => handleContinueLearning(subject.type)}
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
        <div style={{ height: 300 }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </>
  );
}