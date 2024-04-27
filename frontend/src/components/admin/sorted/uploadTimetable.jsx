import React, { useState } from 'react';
import axios from 'axios';

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
  
      console.log(response.data); // Assuming your backend sends a response with a "msg" property
  
      // Set data to true only if the upload was successful
      if (response.data && response.data.msg === 'File uploaded successfully') {
        setdata(true);
      } else {
        setErrorText('An error occurred while uploading. Please try again later.');
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
    </div>
  );
};

export default ImageUploader;
