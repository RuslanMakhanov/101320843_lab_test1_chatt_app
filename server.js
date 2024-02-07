const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); 

const app = express();
app.use(express.json()); 
app.use(express.static('public')); 


const DB_HOST = "cluster0.bytowar.mongodb.net"
const DB_USER = "misterruslan1701"
const DB_PASSWORD = "544081"
const DB_NAME = "w2024_comp3133"
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('Connected to db'))
  .catch((err) => console.log(err));

app.post('/signup', async (req, res) => {
    try {

        // Create a new user with the hashed password
        const user = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        });

        // Save the user to the database
        const newUser = await user.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && password === user.password) { 
            res.json({ success: true, message: "Login successful" });
            console.log("Right user passwrod")
        } else {
            res.json({ success: false, message: "Invalid credentials" });
            console.log("Not Right user passwrod")
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
