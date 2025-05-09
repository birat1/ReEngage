import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardHeader({ colors }) {
  const navigate = useNavigate();

  const buttonStyle = {
    fontSize: '14px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
  };

  return (
    <div 
      className='mb-4 p-4'
      style={{
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        borderTop: `3px solid ${colors.primary}`,
        backgroundImage: `linear-gradient(to right, #ffffff, #f9fbff)`,
      }}
    >
      <div className='d-flex align-items-center mb-3'>
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}40)`,
            padding: '12px',
            borderRadius: '12px',
            marginRight: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill={colors.primary}
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        </div>
        <div>
          <h1
            className="h4 fw-bold m-0"
            style={{
              color: colors.darkText,
              fontSize: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Admin Dashboard
          </h1>
          <p
            className="mb-0"
            style={{
              fontSize: '14px',
              color: colors.lightText,
              marginTop: '5px',
            }}
          >
            Manage your students and view their progress
          </p>
        </div>
      </div>
      <div className='row g-3 mt-2'>
        <div className='col-md-6'>
          <div 
            className='p-4 rounded h-100' 
            style={{ 
              background: `linear-gradient(to right, ${colors.primary}08, ${colors.primary}15)`,
              borderLeft: `4px solid ${colors.primary}`,
              transition: 'all 0.3s ease'
            }}
          >
            <button 
              style={{
                ...buttonStyle,
                background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}ee)`,
                color: 'white'
              }}
              onClick={() => navigate('/student-progress')}
            >
              <i className="bi bi-bar-chart-line me-2"></i>
              View Student Progress
            </button>
            <p className='mt-3 mb-0 text-center' style={{ fontSize: '13px', color: colors.darkText }}>
              View detailed performance data for all your students
            </p>
          </div>
        </div>
        <div className='col-md-6'>
          <div 
            className='p-4 rounded h-100' 
            style={{ 
              background: `linear-gradient(to right, ${colors.secondary}08, ${colors.secondary}15)`,
              borderLeft: `4px solid ${colors.secondary}`,
              transition: 'all 0.3s ease'
            }}
          >
            <button 
              style={{
                ...buttonStyle,
                background: `linear-gradient(to right, ${colors.secondary}, ${colors.secondary}ee)`,
                color: 'white'
              }}
              onClick={() => navigate('/child-register')}
            >
              <i className="bi bi-person-plus me-2"></i>
              Register New Student
            </button>
            <p className='mt-3 mb-0 text-center' style={{ fontSize: '13px', color: colors.darkText }}>
              Add a new student to your class 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}