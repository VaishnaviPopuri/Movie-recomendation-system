const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const app = express();
const port = 5000;

// Middleware
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

// Define a schema for user registration input validation
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// API endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    // Validate user input
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Insert user data into "users" collection
    await db.collection('users').insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});