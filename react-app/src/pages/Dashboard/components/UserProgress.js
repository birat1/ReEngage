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
    Science: '#1d3557',
    Math: '#457b9d',
    English: '#a8dadc',
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
            <div className='card h-100 shadow-sm' style={{ borderRadius: '12px', overflow: 'hidden', border: 'none' }}>
              <div className='card-body' style={{ padding: '1.25rem' }}>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='card-title mb-0' style={{ fontWeight: '600', color: '#333' }}>{subject.game}</h5>
                  <div style={{ 
                    backgroundColor: `${colors[subject.type]}15`, 
                    borderRadius: '10px',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getIcon(subject.type)}
                  </div>
                </div>
                <div className='mb-4'>
                  <div className='d-flex justify-content-between small mb-1'>
                    <span style={{ fontWeight: '500' }}>
                      {subject.correct_answers}/{subject.total_answers} Questions correct
                    </span>
                    <span style={{ 
                      fontWeight: '600', 
                      color: subject.percentage > 70 ? '#4f46e5' : subject.percentage > 40 ? '#3473c8' : '#666'
                    }}>
                      {subject.total_answers > 0
                        ? `${(subject.percentage).toFixed(1)}%`
                        : 'No data yet'}
                    </span>
                  </div>
                  <div className='progress' style={{ height: '10px', backgroundColor: '#f0f0f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <div
                      className='progress-bar'
                      style={{
                        width: subject.total_answers > 0
                          ? `${subject.percentage}%`
                          : '0%',
                        background: `linear-gradient(to right, ${colors[subject.type]}cc, ${colors[subject.type]})`,
                        borderRadius: '6px',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    ></div>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <button
                    className='continue-learning-btn'
                    style={{ 
                      backgroundColor: 'white',
                      color: colors[subject.type],
                      border: `2px solid ${colors[subject.type]}`,
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontWeight: '600',
                      fontSize: '14px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      boxShadow: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colors[subject.type];
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = colors[subject.type];
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => handleContinueLearning(subject.type)}
                  >
                   <span>Continue Learning</span>
                   <i className="bi bi-play-circle-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='bg-white shadow-sm p-4 mb-4 rounded' style={{ borderRadius: '12px', border: 'none' }}>
        <div style={{ height: 300 }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </>
  );
}