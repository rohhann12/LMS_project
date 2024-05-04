import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function getTimetable() {
  const [forstate, setforstate] = useState(false);
  const [subgroup, setsubgroup] = useState('');
  const [responseData, setResponseData] = useState(null); // New state for response data

  async function click(e) {
    e.preventDefault();
    try {
      console.log(subgroup);
      const response = await axios.post('http://localhost:3000/student/getTimeTable', {
        subgroup: subgroup
      });
      console.log(response);
      setResponseData(response.data); // Update response data
      setforstate(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <label>
          <input
            type="text"
            placeholder="enter subgroup"
            onChange={(e) => setsubgroup(e.target.value)}
            value={subgroup}
          />
          <button onClick={click}>Submit</button>
        </label>
      </div>
      <div>
        {forstate && responseData && (
          <div>
            {/* Example: Display specific properties of the responseData object */}
            <p>[{responseData}]</p>
          </div>
        )}
        {forstate && (
          <div>
            <p>No data received.</p>
          </div>
        )}
        <Link to='/'>Go Back</Link>
      </div>
    </>
  );
}

export default getTimetable;
