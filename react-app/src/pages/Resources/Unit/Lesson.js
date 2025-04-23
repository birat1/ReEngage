import { useParams } from "react-router-dom";
import "./styles/Lesson.css";
import { useQuery } from "@tanstack/react-query";
import { fetchVideo } from "../api/lessonAssets";

function Lesson() {
  const { year, subject, lesson } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["video", lesson],
    queryFn: () => fetchVideo(lesson),
  });

  const video = data;

  return (
    <>
      <div className="lesson-card shadow-sm rounded">
        <p>
          {year} {subject} {lesson}
        </p>
        {video ? (
          <>
            <video controls width="600" src={video} />
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
}

export default Lesson;
