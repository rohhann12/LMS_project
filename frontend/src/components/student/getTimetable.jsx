import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getTimeTable() {
    const [subgroup, setSubgroup] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState('');

    async function fetching() {
        try {
            console.log(subgroup);
            const response = await axios.post("http://localhost:3000/student/getTimeTable", {
                subgroup: subgroup
            });
            console.log(response.data); // Log the entire response to see what's being received
    
            const data = response.data.data; // Access the 'data' array from the response
            if (data && data.length > 0) {
                const { fileData2 } = data[0]; // Assuming you want to use the first object's fileData2
                console.log(fileData2); // Log fileData2 separately to check its content
    
                if (fileData2) {
                    const imageSrc = `data:image/png;base64,${fileData2}`; 
                    setImageSrc(imageSrc);
                    console.log("hi");
                } else {
                    setError('No image data found for the specified subgroup.');
                }
            } else {
                setError('No image data found for the specified subgroup.');
            }
            
        } catch (error) {
            console.error('Error fetching timetable:', error);
            setError('Failed to fetch timetable. Please try again.');
        }
    }
    
    return (
        <>
            <div>
                <p>Get TimeTable here</p>
                <input type="text"
                    placeholder='enter subgroup'
                    value={subgroup}
                    required
                    onChange={(e) => setSubgroup(e.target.value)}
                />
                <button onClick={fetching}>Get Time Table</button>
            </div>
            {imageSrc && (
                <div>
                    <img src={imageSrc} alt="Timetable" />
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}

export default getTimeTable;
