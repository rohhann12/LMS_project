import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [rollnumber, setrollnumber] = useState('');
  const [subgroup, setsubgroup] = useState('');
  const [error, setError] = useState('');

  const enterData = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://localhost:3000/admin/addStudent', {
        username:username,
        password:password,
        rollnumber:rollnumber,
        subgroup:subgroup
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
          Enter Name
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </label>
        <br />
        <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </label>
        <br />

        <label>
          Create Roll Number
          <input
            type="text"
            value={rollnumber}
            onChange={(e) => setrollnumber(e.target.value)}
          />
        </label>
        <br />

        <label>
          Enter subgroup
          <input
            type="text"
            value={subgroup}
            onChange={(e) => setsubgroup(e.target.value)}
          />
        </label>

        <br />
        <button type="submit">Add Student's Marks</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default AddStudent;
