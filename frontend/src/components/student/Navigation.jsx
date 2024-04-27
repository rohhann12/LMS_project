// card bna dena h jismei alag alag link alg jagah route krega
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './individual/All'
import CN from './individual/CN'
import DBMS from './individual/DBMS'
import SE from './individual/SE'
function allCourse() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/allCourse" element={<App />} />
         <Route path="/DBMS" element={<DBMS />} />
         <Route path ="/SE" element={< SE/>} />
         <Route path ="/CN" element={<CN />} />
          <Route path="*" element={<h1>Route does not exist</h1>}/>
      </Routes>
  </BrowserRouter>
    </>
  )
}

export default allCourse