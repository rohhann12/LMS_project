import React from 'react';
import { Link } from 'react-router-dom';


function All() {
  return (
    <>

      <p>ADMIN DASHBOARD</p>
      <Link to='/addStudent'>Add Student Here</Link>
      <br/>
      <Link to='/UploadTimeTable'>Upload Time Table</Link>
      <br/>
      <Link to='/addMarks'>Add Marks Here</Link>
      <br/>

    </>
  );
}

export default All;
