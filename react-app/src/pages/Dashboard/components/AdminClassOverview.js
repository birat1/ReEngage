

export default function AdminClassOverview({ studentsCount, colors, yearGroups }) {
  return (
    <div>
      <h5
        style={{
          fontSize: '1.3rem',
          fontWeight: '600',
          color: colors.darkText,
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <i className="bi bi-people-fill" style={{ color: colors.primary }}></i>
        Class Overview
      </h5>
      <div className="row g-3">
        <div className="col-md-4">
          <div
            className="p-4 rounded text-center h-100"
            style={{
              background: `linear-gradient(135deg, #ffffff, ${colors.primary}10)`,
              border: `1px solid ${colors.cardBorder}`,
              borderBottom: `3px solid ${colors.primary}`,
            }}
          >
            <div
              style={{
                fontSize: '38px',
                fontWeight: 'bold',
                color: colors.primary,
                lineHeight: 1.1,
              }}
            >
              {studentsCount}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: colors.lightText,
                marginTop: '6px',
              }}
            >
              <i className="bi bi-mortarboard me-1"></i> Student(s)
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 rounded text-center h-100"
            style={{
              background: `linear-gradient(135deg, #ffffff, ${colors.secondary}10)`,
              border: `1px solid ${colors.cardBorder}`,
              borderBottom: `3px solid ${colors.secondary}`,
            }}
          >
            <div
              style={{
                fontSize: '38px',
                fontWeight: 'bold',
                color: colors.secondary,
                lineHeight: 1.1,
              }}
            >
              3
            </div>
            <div
              style={{
                fontSize: '14px',
                color: colors.lightText,
                marginTop: '6px',
              }}
            >
              <i className="bi bi-controller me-1"></i> Learning Games
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 rounded text-center h-100"
            style={{
              background: `linear-gradient(135deg, #ffffff, ${colors.tertiary}10)`,
              border: `1px solid ${colors.cardBorder}`,
              borderBottom: `3px solid ${colors.tertiary}`,
            }}
          >
            <div
              style={{
                fontSize: '38px',
                fontWeight: 'bold',
                color: colors.tertiary,
                lineHeight: 1.1,
              }}
            >
              {yearGroups}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: colors.lightText,
                marginTop: '6px',
              }}
            >
              <i className="bi bi-layers me-1"></i> Year Group(s)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}