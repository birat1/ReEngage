import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchLessons } from "../apiData.js";
import { useQuery } from "@tanstack/react-query";
import Spinner from 'react-bootstrap/Spinner';
import "./styles/LessonList.css";

function LessonList() {
  const { year, subject, unit } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lessons", subject, unit],
    queryFn: () => fetchLessons(subject, unit),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="lesson-list-card slide-up rounded shadow-sm d-flex flex-column align-items-center">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center h-100 text-center">
            Sorry, something went wrong on our side. Please try again later.
          </div>
        ) : (
          <>
            <h4 className="text-center mt-3">{data[0].unitTitle}</h4>
            <div className="lesson-list rounded d-flex flex-column mt-2">
              <div className="rounded d-flex flex-column gap-2">
                {data[0].lessons.map((lesson) => (
                  <Link
                    to={`/resources/${year}/${subject}/${unit}/${lesson.lessonSlug}`}
                    style={{ textDecoration: "none", color: "#4A4A4A" }}
                  >
                    <div className="lesson-entry rounded shadow-sm p-3">
                      {lesson.lessonTitle}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LessonList;
