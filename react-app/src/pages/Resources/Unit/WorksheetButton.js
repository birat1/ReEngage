import { useQuery } from "@tanstack/react-query";
import { fetchWorksheet } from "../apiData.js";
import { useParams } from "react-router-dom";
import "./styles/WorksheetButton.css";
import Button from "./assets/downloadbutton.svg";
import Spinner from 'react-bootstrap/Spinner';
import { Download } from "lucide-react";

function WorkSheetButton() {
  const { lesson } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["worksheet", lesson],
    queryFn: () => fetchWorksheet(lesson),
    refetchOnWindowFocus: false,
  });

  const download = () => {
    if (data) {
      const link = document.createElement("a");
      link.href = data;

      link.download = `${lesson}.pdf`;

      // Append the link, trigger the click, and remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="secondary" size="sm"/>
        </div>
      ) : (
        <div
          className="download-btn rounded d-flex justify-content-center shadow-sm"
          onClick={download}
          style={{ height: "2.5rem" }}
        >
          <Download size={28} color="#4a4a4a" strokeWidth={1.5} />
        </div>
      )}
    </>
  );
}

export default WorkSheetButton;
