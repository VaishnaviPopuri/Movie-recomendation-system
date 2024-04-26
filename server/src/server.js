const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = 'mongodb+srv://DBUSER:Yasasri@27@cluster0.h6wujqo.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Return database object
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Example API endpoint to fetch all movies
app.get('/movies', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const movies = await db.collection('movies').find().toArray();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
    console.log('Server is running on port ${port}');
  });