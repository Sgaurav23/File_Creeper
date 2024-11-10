const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes'); // Updated to import fileRoutes
const userRoutes = require('./routes/userRoutes');
const { authMiddleware } = require('./authMiddleware');

dotenv.config();
const app = express();
app.use(cors({
  methods: ['GET', 'POST', 'PUT', "DELETE"],
  origin: 'http://localhost:5173'
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('notConnected', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/files', authMiddleware, fileRoutes); // Updated to use fileRoutes
app.use('/api/users', userRoutes);

module.exports = app;