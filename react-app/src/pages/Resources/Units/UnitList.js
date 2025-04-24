import { useQuery } from "@tanstack/react-query";
import { fetchUnits } from "../api/units.js";
import { useParams, Link } from "react-router-dom";
import "./UnitList.css";
import { useState } from "react";
import Maths from "../../../assets/images/Maths.png";
import Flask from "../../../assets/images/Flask.png";
import Book from "../../../assets/images/Open-Book.png";

function UnitList() {
  const { year, subject } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["units", subject, year],
    queryFn: () => fetchUnits(subject, year),
    refetchOnWindowFocus: false,
  });

  const paginatedUnits = data?.slice((currentPage - 1) * 5, currentPage * 5);

  const totalPages = data ? Math.ceil(data.length / 5) : 1;

  return (
    <>
      <h2 className="fw-bolder">Year {year}</h2>
      {subject === "english" ? <img className="subject-icon" src={Book} /> : ""}
      {subject === "science" ? (
        <img className="subject-icon" src={Flask} />
      ) : (
        ""
      )}
      {subject === "maths" ? <img className="subject-icon" src={Maths} /> : ""}

      <div className="unit-list shadow-sm rounded d-flex flex-column justify-content-between align-items-center gap-3 pt-4 pb-4 mt-1">
        {isLoading || isFetching ? (
          <>Loading...</>
        ) : (
          <>
            <div className="unit-entries d-flex flex-column align-items-center gap-3 w-100">
              {paginatedUnits.map((unit) => (
                <div
                  className="unit-entry rounded shadow-sm"
                  key={unit.unitSlug}
                >
                  <Link
                    className="d-flex justify-content-between align-items-center gap-3"
                    to={`/resources/${year}/${subject}/${unit.unitSlug}`}
                    style={{ textDecoration: "none", color: "#4A4A4A" }}
                  >
                    <h4>{unit.unitTitle}</h4>
                    <span style={{ fontSize: "3rem" }}>&#8250;</span>
                  </Link>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div
                className="pagination-controls d-flex gap-5 mt-3 align-items-center"
                style={{ marginTop: "auto" }}
              >
                <button
                  className="p-button rounded shadow-sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &#8249;
                </button>
                <span>{currentPage}</span>
                <button
                  className="p-button rounded shadow-sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  &#8250;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default UnitList;
