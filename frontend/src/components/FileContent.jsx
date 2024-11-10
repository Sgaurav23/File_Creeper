import React from 'react';
import PropTypes from 'prop-types';
import './FileContent'

const FileContent = ({ file, onBack }) => (
  <div className="file-content">
    <h3>File Content</h3>
    {file.fileType.startsWith('image/') ? (
      <img src={file.fileUrl} alt={file.fileName} style={{ maxWidth: '100%', height: 'auto' }} />
    ) : (
      <pre>{JSON.stringify(file, null, 2)}</pre>
    )}
    <button className="back-button" onClick={onBack}>Back to Dashboard</button>
  </div>
);

FileContent.propTypes = {
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

export default FileContent;
