// card bna dena h jismei alag alag link alg jagah route krega
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './LinkAdmin'
import AddStudent from './sorted/addStudent'
import AddMarks from './addMarks'
import UploadTT from './uploadTimetable'
import DeleteUser from './deleteUser'
import Assignmnet from './uploadAssignment'
function RouteAdmin() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
         <Route path="/AddStudent" element={<AddStudent />} />
         <Route path ="/UploadTimeTable" element={< UploadTT/>} />
         <Route path ="/AddMarks" element={<AddMarks />} />
         <Route path ="/DeleteUser" element={<DeleteUser />} />
         <Route path ="/UploadAssignment" element={<Assignmnet />} />
        <Route path="*" element={<h1>Route does not exist</h1>}/>
      </Routes>
  </BrowserRouter>
    </>
  )
}

export default RouteAdmin