import React, { useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UserContext } from '../context/UserContext';
import './UploadFiles.css';

const UploadFiles = ({ onFileUploaded }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { state } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/files', formData, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      console.log('File uploaded:', res.data);
      onFileUploaded();
      setUploadProgress(0); // Reset progress after upload
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadProgress(0); // Reset progress if error
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview file if it's an image
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('file-preview').src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="upload-files">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <img
          id="file-preview"
          alt="Preview"
          style={{
            display: file && file.type.startsWith('image/') ? 'block' : 'none',
            maxWidth: '100%',
            maxHeight: '200px',
          }}
        />
        {uploadProgress > 0 && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${uploadProgress}%` }}>
              {uploadProgress}%
            </div>
          </div>
        )}
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

UploadFiles.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};

export default UploadFiles;
