import React, { useState } from 'react';
import axios from 'axios';

function UploadTimetable() {
  const [subgroup, setSubgroup] = useState("");
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subgroup", subgroup);
    formData.append("image", image);
    console.log(subgroup, image);

    try {
      const result = await axios.post(
        "http://localhost:3000/admin/uploadTimeTable",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      setIsUploaded(true); 
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return (
    <>
      <div className="App">
        <form onSubmit={submitImage}>
          <h4>Upload TimeTable</h4>
          <br />
          <input
            type="text"
            placeholder="Enter Subgroup"
            value={subgroup}
            required
            onChange={(e) => setSubgroup(e.target.value)}
          />
          <br />
          <br />
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <br />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
      <div>
        {isUploaded && 
          <div>
            <p>Uploaded successfully</p>
          </div>
        }  
      </div>
    </>
  );
}

export default UploadTimetable;
