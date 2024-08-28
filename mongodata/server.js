const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const bcrypt = require('bcrypt'); // Import Bcrypt for password hashing
const app = express(); // Initialize the Express app

// Connect to MongoDB
mongoose.connect('mongodb://localhost/keiyo_explorer');

// User model
const User = mongoose.model('User', {
    username: String,
    trainLine: String,
    homeAddress: String,
    workAddress: String,
    additionalAddress: String,
    startStation: String,
    endStation: String,
    email: String,
    password: String
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle user data retrieval
app.get('/api/user', async (req, res) => {
    const userId = req.query.userId; // Or use a session/token to identify the user

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({
            success: true,
            username: user.username,
            trainLine: user.trainLine,
            homeAddress: user.homeAddress, // Used internally for search
            workAddress: user.workAddress  // Used internally for search
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
