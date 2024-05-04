import React from 'react';
import { Link } from 'react-router-dom';


function All() {
  return (
    <>

      <p>Student Dashboard</p>
      <Link to='/CN'>Computer Networks</Link>
      <br/>
      <Link to='/SE'>Software Engineering</Link>
      <br/>
      <Link to='/DBMS'>Database Management</Link>
      <br/>
      <Link to='/getMarks'>Get Marks</Link>
      <br />
      <Link to='/getTimetable'>Get Time Table</Link>

    </>
  );
}

export default All;
