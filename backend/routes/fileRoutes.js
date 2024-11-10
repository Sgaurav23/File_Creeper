const express = require('express');
const router = express.Router();
const { File, User } = require('../schema'); // Adjust import to match your project structure
const multer = require('multer');
const path = require('path')
const { authMiddleware } = require('../authMiddleware');

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Use appropriate storage for your environment
const upload = multer({ storage });

// Add File
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  console.log('req.user:', req.user); // Log to verify req.user
  const { originalname, mimetype, buffer } = req.file;
  const userId = req.user.user.id; // Correctly accessing user ID

  if (!originalname) {
    return res.status(400).json({ msg: 'File name is required' });
  }

  try {
    // Simulate file upload and get URL (use actual file storage logic)
    const fileUrl = 'URL-OF-FILE-IN-STORAGE';

    const newFile = new File({
      fileName: originalname,
      fileType: mimetype,
      fileUrl,
      uploader: userId, // Set the uploader field correctly
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    console.error('Error adding file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get File Content
router.get('/content/:id', authMiddleware, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // For demonstration purposes, returning file URL (in real scenario, return file content)
    res.json({ content: file.fileUrl }); // Adjust this as needed to return the actual file content
  } catch (error) {
    console.error('Error fetching file content:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Files
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching files for user:', req.user.user.id); // Add this log
    const files = await File.find({ uploader: req.user.user.id }).populate('uploader', 'name email'); // Populate uploader field
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update File
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete File
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ msg: 'File deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


// Serve Static Files
router.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Ensure correct path

module.exports = router;




