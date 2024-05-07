import React, { useState } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom'
function AddMarks() {
  const [DBMS, setDBMS] = useState('');
  const [CN, setCN] = useState('');
  const [SE, setSE] = useState('');
  const [rollnumber, setRollNumber] = useState('');
  const [error, setError] = useState('');

const enterData = async (e) => {
  e.preventDefault();

  // Convert input values to numbers if they are valid numbers
  const dbmsNumber = parseInt(DBMS);
  const cnNumber = parseInt(CN);
  const seNumber = parseInt(SE);

  if (isNaN(dbmsNumber) || isNaN(cnNumber) || isNaN(seNumber)) {
    setError('Marks should be numbers.');
    return;
  }

  console.log(rollnumber); // Use the existing state variable rollnumber

  try {
    const response = await axios.post('http://localhost:3000/admin/addMarks', {
      rollnumber: rollnumber,
      DBMS: dbmsNumber,
      SE: seNumber,
      CN: cnNumber
    });

    console.log('Marks added successfully:', response.data);
    // You can handle success, e.g., show a success message to the user
  } catch (error) {
    console.error('Error adding marks:', error);
  }
};

  return (
    <div>
      <form onSubmit={enterData}>
        <p>Marks are to be given out of 100</p>
        <label>
          Give Roll Number:
          <input
            type="text"
            value={rollnumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </label>
        <br />

        <label>
          Enter DBMS Marks:
          <input
            type="text"
            value={DBMS}
            onChange={(e) => setDBMS(e.target.value)}
          />
        </label>
        <br />

        <label>
          Enter CN Marks:
          <input
            type="text"
            value={CN}
            onChange={(e) => setCN(e.target.value)}
          />
        </label>
        <br />

        <label>
          Enter SE Marks:
          <input
            type="text"
            value={SE}
            onChange={(e) => setSE(e.target.value)}
          />
        </label>

        <br />
        <button type="submit">Add Student's Marks</button>
      </form>
      {error && <div>{error}</div>}
      <Link to='/'>Go Back </Link>
      <br/>
    </div>
  );
}

export default AddMarks;
