import React from 'react';
import { Link } from 'react-router-dom';


function All() {
  return (
    <>

      <h1>Student Dashboard</h1>
      <Link to='/CN'>Computer Networks</Link>
      <br/>
      <Link to='/SE'>Software Engineering</Link>
      <br/>
      <Link to='/DBMS'>Database Management</Link>
      <br/>
      <Link to='/getMarks'>Get Marks</Link>
      <br />
      <Link to='/getTimetable'>Get Time Table</Link>
      <br />
      <Link to='/getAssignment'>Get Assignment</Link>
      <br />
      
    </>
  );
}

export default All;
