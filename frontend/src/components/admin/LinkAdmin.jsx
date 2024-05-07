import React from 'react';
import { Link } from 'react-router-dom';


function All() {
  return (
    <>

      <p>ADMIN DASHBOARD</p>
      <Link to='/AddStudent'>Add Student Here</Link>
      <br/>
      <Link to='/UploadTimeTable'>Upload Time Table</Link>
      <br/>
      <Link to='/AddMarks'>Add Marks Here</Link>
      <br/>
      <Link to='/DeleteUser'>Delete User</Link>
      <br/>
      <Link to='/UploadAssignment'>Upload Assignment</Link>

    </>
  );
}

export default All;
