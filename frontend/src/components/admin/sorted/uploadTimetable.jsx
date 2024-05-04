import React, { useState } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom'

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [subgroup, setSubgroup] = useState('');
  const [errorText, setErrorText] = useState('');
  const [data,setdata]=useState(false)

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64String(reader.result);
    };

    console.log(setBase64String);
    
    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      if (!base64String || !subgroup) {
        setErrorText('Please select a file and enter a subgroup.');
        return;
      }
  
      const response = await axios.post('http://localhost:3000/admin/uploadTimeTable', {
        base64String: base64String,
        subgroup: subgroup
      });
  
      console.log(response.data); 
      console.log(base64String)
      
      if (response.data && response.data.msg === 'File uploaded successfully') {
        setdata(true);
      }
    } catch (error) {
      console.log('Error:', error.message);
      setErrorText('An error occurred while uploading. Please try again later.');
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <input
        type="text"
        placeholder='Enter Subgroup'
        value={subgroup}
        onChange={(e) => setSubgroup(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {data && <p>{'File Uploaded'}</p>}
      <br/>
      <Link to='/'>Go Back</Link>
    </div>
  );
};

export default ImageUploader;
