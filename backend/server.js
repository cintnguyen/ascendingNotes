const express = require('express');
const cors = require('cors');

// Frotnend is on port 5173, requesting for data from a different backend port 3000, CORS allows for the data to be fetched from a different server

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your-secret-key'; // Replace with your secret key

app.use(bodyParser.json());
app.use(cors())

// Sample user data (for demonstration purposes only)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

const notes = [
  { id: 1, username: 'user1', content: "hello", important: true, deleted: false},
  { id: 2, username: 'user2', content: "hi", important: true, deleted: false},
]

app.get('/notes', /* authenticateToken, */ (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { content, important } = req.body;
  console.log("note and important", content, important)
  const newNote = {id:notes.length+1, username:"user3", content: content, important: important, deleted: false}
  notes.push(newNote)
  res.json({status:"ok", newNote});
});



// Authorization: Bearer eyJhbG
// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
    console.log("HERE", req.headers)
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    console.log("ERROR",err,user)
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login route to generate JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("Username and password", username, password)
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });

  const accessToken = jwt.sign({ username: user.username, id: user.id }, secretKey);
  res.json({ accessToken });
});

// Protected route that requires JWT token for authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected resource accessed successfully', user: req.user });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

