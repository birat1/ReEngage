import { useParams } from "react-router-dom";
import "./styles/Lesson.css";
import { useQueries } from "@tanstack/react-query";
import { fetchVideo, fetchSummary } from "../api/lessonAssets";

function Lesson() {
  const { year, subject, lesson } = useParams();

  const results = useQueries({
    queries: [
      {
        queryKey: ["video", lesson],
        queryFn: () => fetchVideo(lesson),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["summary", lesson],
        queryFn: () => fetchSummary(lesson),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const videoResult = results[0];
  const summaryResult = results[1];

  const video = videoResult.data;
  const summary = summaryResult.data;

  return (
    <>
      <div className="lesson-card slide-up shadow-sm rounded d-flex flex-column align-items-center gap-2 mt-5">
        <div>
          {summaryResult.isLoading ? (
            <div>​</div>
          ) : (
            <>
              <h2>{summary.lessonTitle}</h2>
            </>
          )}
        </div>
        <h1>Hello</h1>
        <h1>Gello</h1>
        <div className="video-card rounded shadow-sm">
          {videoResult.isLoading ? (
            <div>Loading video...</div>
          ) : (
            video && (
              <video controls src={video} className="lesson-video rounded" />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Lesson;
