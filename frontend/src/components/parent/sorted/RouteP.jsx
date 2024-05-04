// card bna dena h jismei alag alag link alg jagah route krega
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './LinkP'
import GetMarks from '../sorted/getMarks'

function allCourse() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
         <Route path="/getMarks" element={<GetMarks />} />
        <Route path="*" element={<h1>Route does not exist</h1>}/>
      </Routes>
  </BrowserRouter>
    </>
  )
}

export default allCourse