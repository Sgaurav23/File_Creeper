import React, { useEffect, useContext, useCallback, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import UploadFiles from '../components/UploadFiles';
import FileList from '../components/FileList';
import UserProfile from '../components/UserProfile';
import FileStats from '../components/FileStats';
import FileInfo from '../components/FileInfo'; // Import the FileInfo component
import FileContent from '../components/FileContent'; // Import the FileContent component
import './Dashboard.css';

const Dashboard = () => {
  const { state } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [view, setView] = useState('info'); // 'info' or 'content'

  const fetchFiles = useCallback(async () => {
    try {
      console.log('Token used for fetching files:', state.token);
      const res = await axios.get('http://localhost:5000/api/files', {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      console.log('Fetched files:', res.data);
      setFiles(res.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }, [state.token]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileAction = (file, action) => {
    setSelectedFile(file);
    setView(action);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <div className="dashboard">
      <h2>Welcome, to File_Creeper</h2>
      <div className="dashboard-sections">
        <div className="files">
          <UploadFiles onFileUploaded={fetchFiles} />
          <FileList fetchFiles={fetchFiles} files={files} onFileAction={handleFileAction} />
        </div>
        <div className="profile">
          <UserProfile numberOfFiles={files.length} />
        </div>
        <div className="content">
          {selectedFile && (view === 'info' ? <FileInfo file={selectedFile} onBack={handleBack} /> : <FileContent file={selectedFile} onBack={handleBack} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
