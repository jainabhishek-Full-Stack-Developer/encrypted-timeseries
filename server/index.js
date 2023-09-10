const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const data = require('./data.json');

const app = express();
app.use(cors());
const server = http.createServer(app);

// Middleware
app.get('/', (req, res) => {
  res.send('Hello, this is the root route.');
});

// MongoDB connection setup
mongoose.connect('mongodb+srv://encrypted-timeseries:VexLBK9Lafes8Pd8@cluster0.yhyp8ct.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB.');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const MessageSchema = new mongoose.Schema({
  name: String,
  origin: String,
  destination: String,
  secret_key: String,
  timestamp: Date,
});

const MessageModel = mongoose.model('Message', MessageSchema);



server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
