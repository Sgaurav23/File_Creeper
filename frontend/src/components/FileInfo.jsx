import React from 'react';
import PropTypes from 'prop-types';

const FileInfo = ({ file, onBack }) => (
  <div className="file-info">
    <h3>File Information</h3>
    <p><strong>File Name:</strong> {file.fileName}</p>
    <p><strong>File Type:</strong> {file.fileType}</p>
    <p><strong>Uploaded By:</strong> {file.uploader.name} ({file.uploader.email})</p>
    <p><strong>Upload Date:</strong> {new Date(file.uploadDate).toLocaleString()}</p>
    <button className="back-button" onClick={onBack}>Back to Dashboard</button>
  </div>
);

FileInfo.propTypes = {
  file: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    uploader: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string
      })
    ]).isRequired,
    uploadDate: PropTypes.string.isRequired
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default FileInfo;
