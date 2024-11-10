// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { User } = require('./schema'); // Adjust the path to your schema

// dotenv.config();

// const clearUsers = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI)
//     await User.deleteMany({}); // Delete all users
//     console.log('All users deleted');
//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error clearing users:', err.message);
//     mongoose.connection.close();
//   }
// };

// clearUsers();





// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// // Define the function to connect to MongoDB and list files
// const listFiles = async () => {
//   try {
//     // Connect to the MongoDB database
//     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     // Access the GridFS files collection
//     const files = await mongoose.connection.db.collection('uploads.files').find({}).toArray();

//     // Log the files found
//     console.log('Files in uploads.files collection:', files);

//     // Close the MongoDB connection
//     mongoose.connection.close();
//   } catch (err) {
//     // Log any errors that occur
//     console.error('Error listing files:', err.message);
//     mongoose.connection.close();
//   }
// };

// // Run the listFiles function
// listFiles();










// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const checkFileExistence = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId('672cf1ca2f82a86831928c21') });
//     console.log('File found:', file);

//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error checking file existence:', err.message);
//     mongoose.connection.close();
//   }
// };

// checkFileExistence();
















// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { GridFSBucket } = require('mongodb');

// dotenv.config();

// const deleteFile = async (fileId) => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    
//     const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId(fileId) });
//     if (!file) {
//       console.log('File not found:', fileId);
//     } else {
//       await bucket.delete(new mongoose.Types.ObjectId(fileId));
//       console.log('File deleted:', fileId);
//     }

//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error deleting file:', err.message);
//     mongoose.connection.close();
//   }
// };

// // Replace with the actual file ID you want to delete
// deleteFile('672dbc7cb19ec16056dd169d');
















// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { GridFSBucket } = require('mongodb');

// // Load environment variables
// dotenv.config();

// // Function to delete all files from GridFS
// const deleteAllFiles = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

//     // Fetch all files
//     const files = await mongoose.connection.db.collection('uploads.files').find({}).toArray();
//     console.log('Files found:', files);

//     // Loop through and delete each file
//     for (let file of files) {
//       await bucket.delete(file._id);
//       console.log('File deleted:', file._id);
//     }

//     console.log('All files deleted successfully.');

//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error deleting files:', err.message);
//     mongoose.connection.close();
//   }
// };

// // Run the deleteAllFiles function
// deleteAllFiles();










const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const checkFileExistence = async (fileId) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId(fileId) });
    console.log('File found:', file);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error checking file existence:', err.message);
    mongoose.connection.close();
  }
};

// Replace with the actual file ID you want to check
checkFileExistence('672e4056b3a85a726ea2782c');
