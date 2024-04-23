import React, { useEffect, useState } from 'react'
import axios from "axios"

const sMarks = () => {
const [fetchMarks,setfetMarks]=useState(" ");
    const getMarks=async()=>{
        const response= await axios.get('http://localhost:3000/getMarks')
        setfetMarks(response.fetchMarks)
    }
    useEffect(()=>{
        getMarks()
    },[])
    return (
<div>{fetchMarks}</div>

  )
}
export default sMarks