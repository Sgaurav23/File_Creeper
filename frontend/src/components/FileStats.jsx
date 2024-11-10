import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FileStats = ({ files }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: []
    }]
  });

  useEffect(() => {
    console.log('Files received by FileStats:', files); // Add this log
    if (files && Array.isArray(files) && files.length > 0) {
      const documentFiles = files.filter(file => file.fileType === 'document' && file.fileName).length;
      const imageFiles = files.filter(file => file.fileType === 'image' && file.fileName).length;
      console.log('Document files count:', documentFiles);
      console.log('Image files count:', imageFiles);

      setChartData({
        labels: ['Document Files', 'Image Files'],
        datasets: [{
          label: 'Files',
          data: [documentFiles, imageFiles],
          backgroundColor: ['#007bff', '#17a2b8']
        }]
      });
    } else {
      console.log('No files to display or files not in expected format');
    }
  }, [files]); // Re-run the effect when 'files' changes

  return (
    <div>
      <h3>File Statistics</h3>
      {chartData.labels.length > 0 ? <Bar data={chartData} /> : <p>No data to display</p>}
    </div>
  );
};

FileStats.propTypes = {
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
};

export default FileStats;
