

export default function AdminTopStudentsList({ topStudents, colors }) {
  return (
    <div className="mt-3">
      {topStudents.map((student, index) => (
        <div
          key={student.user.id}
          className="rounded p-3 mb-2"
          style={{
            background:
              index === 0
                ? `linear-gradient(to right, #fff8e1, #ffffff)`
                : "#ffffff",
            border: `1px solid ${colors.cardBorder}`,
            borderLeft:
              index === 0
                ? "4px solid #FFD700"
                : index === 1
                ? "4px solid #C0C0C0"
                : index === 2
                ? "4px solid #CD7F32"
                : "4px solid #e0e0e0",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  index === 0
                    ? "#FFD700"
                    : index === 1
                    ? "#C0C0C0"
                    : index === 2
                    ? "#CD7F32"
                    : "#e0e0e0",
                color: index === 0 ? "#5F4B00" : "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                marginRight: "12px",
              }}
            >
              {index + 1}
            </div>
            <div style={{ flex: "1" }}>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0" style={{ fontWeight: "600" }}>
                  {student.firstname} {student.surname}
                </h6>
                <span
                  style={{
                    color: colors.primary,
                    fontWeight: "600",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <i
                    className="bi bi-star-fill"
                    style={{
                      color: index === 0 ? "#FFD700" : colors.primary,
                      fontSize: "12px",
                    }}
                  ></i>
                  {student.xp} XP
                </span>
              </div>
              <div
                className="mt-2"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "8px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        (
                          ((student.english_correct +
                            student.maths_correct +
                            student.science_correct) /
                            (student.english_answered +
                              student.maths_answered +
                              student.science_answered)) *
                          100
                        ).toFixed(1) || 0
                      }%`,
                      height: "100%",
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.progressBar})`,
                      borderRadius: "4px",
                      transition: "width 1s ease-in-out",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: colors.darkText,
                    fontWeight: "500",
                  }}
                >
                  {(
                    ((student.english_correct +
                      student.maths_correct +
                      student.science_correct) /
                      (student.english_answered +
                        student.maths_answered +
                        student.science_answered)) *
                    100
                  ).toFixed(1) || 0}
                  %
                  <span
                    className="ms-1"
                    style={{
                      fontSize: "11px",
                      color: colors.lightText,
                      fontWeight: "normal",
                    }}
                  >
                    accuracy
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
