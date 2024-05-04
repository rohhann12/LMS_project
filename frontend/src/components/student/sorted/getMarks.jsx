import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
const RollNumberChecker = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [marksData, setMarksData] = useState(null);
  const [Marks,setMarks]=useState('');

  const getMarks= async(e)=>{
    e.preventDefault();

    try {
        console.log(rollNumber);
      const response = await axios.post('http://localhost:3000/parent/getMarks', {
        rollnumber: rollNumber
      });
      console.log(response.data)
      setMarksData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }
  return (
    <div>
      <form onSubmit={getMarks}>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button type="submit" >Get Marks</button>
      </form>
      {marksData && (
        <div>
        <p>DBMS-{`${marksData['marksObtained']['DBMS']}`}</p>
        <p>CN- {`${marksData['marksObtained']['CN']}`}</p>
        <p>SE-{`${marksData['marksObtained']['SE']}`}</p>
        </div>
      )}
      <Link to='/'>Go Back</Link>
    </div>
  );
};

export default RollNumberChecker;
