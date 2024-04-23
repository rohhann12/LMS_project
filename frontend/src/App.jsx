import { useState, useEffect } from 'react';
import Axios from "axios"
async function App() {
  const [data,setData]=useState([]);
  const resp=await Axios.get("http://localhost:3000/student/allcourses/DBMS")
  .then((response)=>{
    const a=response.data
  })
  console.log(a);
  return (
    <div>
        <h1>{data}</h1>
    </div>
  );
}
export default App;