import { useQuery } from "@tanstack/react-query";
import { fetchWorksheet } from "../api/lessonAssets";
import { useParams } from "react-router-dom";
import "./styles/WorksheetButton.css";
import Button from "./assets/downloadbutton.svg";

function WorkSheetButton() {

    const { year, subject, lesson } = useParams();
  
    const { data, isLoading, isFetching } = useQuery({
      queryKey: ["worksheet", lesson],
      queryFn: () => fetchWorksheet(lesson),
      refetchOnWindowFocus: false,
    });

    const download = () => {
        if (data) {
    
          const link = document.createElement('a');
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
        <div className="download-btn rounded d-flex justify-content-center shadow-sm" onClick={download} style={{ height: "2.5rem"}}>
            <img src={Button} style={{ width: "90%"}}/>
        </div>
        </>
    );
};

export default WorkSheetButton;
