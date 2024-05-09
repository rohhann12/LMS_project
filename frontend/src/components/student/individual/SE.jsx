import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CN() {
  const [data, setData] = useState(null); // Initialize state with null

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/student/allcourse/SE");
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); 
  }, []); 
  
  return (
    <>
      {data && (
        <div>
          
          
          <div>
          <p>Course Name: {data.courseName}</p>
          <p>Course Site: {data.courseSite}</p>
          <p>Credits: {data.Credits}</p>
  </div>
        </div>
      )}
    <Link to='/'>Go Back to home Screen</Link>

    </>
  );
}

export default CN;
