import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './FileList.css';
import { UserContext } from '../context/UserContext';

const FileList = ({ files, fetchFiles, onFileAction }) => {
  const { state } = useContext(UserContext);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDelete = async (id) => {
    try {
      console.log('Deleting file with ID:', id);
      await axios.delete(`http://localhost:5000/api/files/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      console.log('File deleted:', id);
      
      await fetchFiles();
      setFeedback('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      setFeedback('Error deleting file');
    }
  };

  return (
    <div className="file-list">
      <h3>File List</h3>
      {feedback && <p className="feedback">{feedback}</p>}
      <ul>
        {files.map(file => (
          <li key={file._id}>
            <div>{file.fileName}</div>
            <button className="file-button info-button" onClick={() => onFileAction(file, 'info')} title="Info">ℹ️</button>
            <button className="file-button content-button" onClick={() => onFileAction(file, 'content')} title="Content">📄</button>
            <button className="file-button delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(file._id); }} title="Delete">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    fileType: PropTypes.string,
    fileUrl: PropTypes.string,
    uploader: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string
      })
    ]).isRequired
  })).isRequired,
  fetchFiles: PropTypes.func.isRequired,
  onFileAction: PropTypes.func.isRequired
};

export default FileList;
