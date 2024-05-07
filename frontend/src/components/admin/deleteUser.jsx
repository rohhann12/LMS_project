import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function deleteUser() {
  const [rollnumber, setRollnumber] = useState('');
    const [abc,setabc]=useState(false)
  async function handleClick() {
    try {
      const response = await axios.post('http://localhost:3000/admin/deleteUser', {
        rollnumber: rollnumber
      });
      console.log(response.data.msg); // Log the message from the server
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setabc(true)
  }

  return (
    <>
      <form>
        <input
          type="text"
          placeholder='Enter Roll Number'
          value={rollnumber}
          onChange={(e) => setRollnumber(e.target.value)}
        />
        <button type="button" onClick={handleClick}>Delete User</button>
      </form>
      {abc &&  
      <div>
        <p>User with rollnumber {rollnumber} deleted</p>
      </div>
      }
    </>
  );
}

export default deleteUser;
