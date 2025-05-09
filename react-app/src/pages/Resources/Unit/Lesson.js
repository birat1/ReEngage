import { useParams } from "react-router-dom";
import "./styles/Lesson.css";
import { useQueries } from "@tanstack/react-query";
import { fetchSummary, fetchVideo } from "../apiData.js";
import WorkSheetButton from "./WorksheetButton";
import Bricks from "./assets/bricks.png";
import Spinner from 'react-bootstrap/Spinner';

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
      <div className="lesson-card slide-up shadow-sm rounded d-flex flex-column align-items-center gap-3 mt-5 mb-5">
        <div>
          {summaryResult.isLoading ? (
            <div></div>
          ) : summaryResult.isError ? (
            <div>Something went wrong. Failed to load Lesson.</div>
          ) : (
            <>
              <h3 className="fw-bold text-center">{summary.lessonTitle}</h3>
            </>
          )}
        </div>
        <div className="video-card rounded shadow-sm d-flex flex-column justify-content-center align-items-center">
          {subject === "science" ? (
            <>
              <img src={Bricks} alt="Bricks" className="bricks" />
              <p>This video is under construction.</p>
            </>
          ) : videoResult.isLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
            video && (
              <video
                controls
                src={video}
                className="lesson-video rounded"
                type="video/mp4"
              />
            )
          )}
        </div>
        <div className="content-card rounded shadow-sm">
          <h4 className="fw-bolder mb-3">Learning Points</h4>
          {summaryResult.isLoading ? (
            <div></div>
          ) : summaryResult.isError ? (
            <div></div>
          ) : (
            <>
              <ul>
                {summary.keyLearningPoints.map((point) => (
                  <li>{point.keyLearningPoint}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="content-card rounded shadow-sm">
          <h4 className="fw-bolder mb-3">Keywords</h4>
          {summaryResult.isLoading ? (
            <div></div>
          ) : summaryResult.isError ? (
            <div></div>
          ) : (
            <>
              {summary.lessonKeywords.map((word) => (
                <p>
                  <span className="fw-bold">
                    {word.keyword.charAt(0).toUpperCase() +
                      word.keyword.slice(1)}
                    :{" "}
                  </span>
                  {word.description}
                </p>
              ))}
            </>
          )}
        </div>
        <div className="content-card rounded shadow-sm mb-3">
          <h4 className="fw-bolder mb-3">Worksheet</h4>
          <div className="worksheet-entry rounded d-flex align-items-center justify-content-between px-3 py-3">
            {summaryResult.isLoading ? (
              <div></div>
            ) : summaryResult.isError ? (
              <div></div>
            ) : (
              <>
                <p className="mb-0">Worksheet</p>
                <WorkSheetButton />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lesson;
