const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const crypto = require('crypto');
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

// This allows connections from any origin
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust this to your client's URL
    methods: ['GET', 'POST'],
  },
});

function generateRandomMessage() {
  try {
    const randomNameIndex = Math.floor(Math.random() * data.names.length);
    const randomOriginIndex = Math.floor(Math.random() * data.cities.length);
    const randomDestinationIndex = Math.floor(Math.random() * data.cities.length);

    const randomName = data.names[randomNameIndex];
    const randomOrigin = data.cities[randomOriginIndex];
    const randomDestination = data.cities[randomDestinationIndex];

    const messageData = {
      name: randomName,
      origin: randomOrigin,
      destination: randomDestination,
    };

    // Calculate the secret_key as a hash of the messageData object
    const secretKey = crypto
      .createHash('sha256')
      .update(JSON.stringify(messageData))
      .digest('hex');

    messageData.secret_key = secretKey;

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(secretKey, 'hex'),
      iv
    );

    const encryptedMessage = Buffer.concat([
      iv, // Include the IV in the encrypted message
      cipher.update(JSON.stringify(messageData)),
      cipher.final(),
    ]);

    // Return the secret key and encrypted message separately
    return {
      secret_key: secretKey,
      encrypted_message: encryptedMessage.toString('hex'),
    };
  } catch (error) {
    console.error('Error generating random message:', error);
    return null; // Handle the error gracefully
  }
}

console.log(generateRandomMessage());

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
