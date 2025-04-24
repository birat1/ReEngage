import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchLessons } from "../api/lessons";
import { useQuery } from "@tanstack/react-query";
import "./styles/LessonList.css";

function LessonList() {
  const { year, subject, unit } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["lessons", subject, unit],
    queryFn: () => fetchLessons(subject, unit),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="lesson-list-card rounded shadow-sm d-flex flex-column align-items-center">
        {isLoading ? (
          <div className="">Loading...</div>
        ) : (
          <>
            <h4 className="text-center">{data[0].unitTitle}</h4>
            <div className="lesson-list rounded d-flex flex-column">
              <div className="rounded d-flex flex-column gap-2">
                {data[0].lessons.map((lesson) => (
                  <Link to={`/resources/${year}/${subject}/${unit}/${lesson.lessonSlug}`} style={{ textDecoration: "none", color: "#4A4A4A" }}>
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
