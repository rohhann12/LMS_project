import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
function UploadTimetable() {
  const [CourseName, setCourseName] = useState("");
  const [file, setFile] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CourseName", CourseName);
    formData.append("file", file);
    console.log(CourseName, file);

    try {
      const result = await axios.post(
        "http://localhost:3000/admin/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result.data);
      setIsUploaded(true); // Set uploaded state to true after successful upload
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={submitImage}>
        <h4>Upload Assignments</h4>
        <br />
        <label>Choose Subject Name</label>
        <select id="course" name="course" value={CourseName} onChange={(e) => setCourseName(e.target.value)}>
          <option value="">Choose Subject</option>
          <option value="DBMS">DBMS</option>
          <option value="SE">SE</option>
          <option value="CN">CN</option>
        </select>
        <br />
        <br />
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
      {isUploaded && 
        <div>
          <p>Uploaded successfully</p>
        </div>
      } 
      <Link to='/'>Go Back</Link> 
    </div>
  );
}

export default UploadTimetable;
