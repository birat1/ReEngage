import { useNavigate } from 'react-router-dom';

export default function AdminQuickActions({ colors }) {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Leaderboard',
      description: 'See top-performing students',
      icon: 'bi-trophy',
      color: colors.primary,
      background: `${colors.primary}15`,
      route: '/leaderboard',
    },
    {
      title: 'Resources',
      description: 'Access educational materials',
      icon: 'bi-book',
      color: colors.secondary,
      background: `${colors.secondary}15`,
      route: '/resources',
    },
  ];

  return (
    <div className='row g-3'>
      {quickActions.map((action, index) => (
        <div className='col-md-6' key={index}>
          <div
            className='p-3 rounded h-100'
            style={{
              transition: 'all 0.3s ease',
              border: `1px solid ${colors.cardBorder}`,
              background: `linear-gradient(to right, #ffffff, ${action.background})`,
              borderLeft: `4px solid ${action.color}`,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.05)';
              e.currentTarget.style.background = `linear-gradient(to right, #ffffff, ${action.color}15)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = `linear-gradient(to right, #ffffff, ${action.background})`;
            }}
          >
            <div className='d-flex align-items-center'>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: action.background,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i className={`bi ${action.icon}`} style={{ fontSize: '22px', color: action.color }}></i>
              </div>
              <div className='ms-3' style={{ flex: 1 }}>
                <h6 style={{ fontWeight: '600', marginBottom: '4px', color: colors.darkText }}>
                  {action.title}
                </h6>
                <p className='mb-0' style={{ fontSize: '13px', color: colors.lightText }}>
                  {action.description}
                </p>
              </div>
              <button
                className='btn-sm px-3 py-2'
                style={{
                  backgroundColor: action.background,
                  color: action.color,
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '13px',
                }}
                onClick={() => navigate(action.route)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}