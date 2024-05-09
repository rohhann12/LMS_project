import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import {Link } from 'react-router-dom'

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:3000/student/getAssignments");
      console.log(result.data.data);
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:3000/files/${pdf}`);
  };

  return (
    <div className="App">
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => (
                <div key={data.id} className="inner-div">
                  <button
                    className="btn btn-primary"
                    onClick={() => showPdf(data.pdf)}
                  >
                    Show Assignment
                  </button>
                </div>
              ))}
        </div>
      </div>
      {pdfFile && <PdfComp pdfFile={pdfFile} />} {/* Render PdfComp if pdfFile is not null */}
      <div>
        <Link to='/'>Go Back</Link>
      </div>
    </div>
  );
}

export default App;
