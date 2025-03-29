// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // For parsing application/json
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' folder

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Uploads directory created.');
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Todo Model
const Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  image: String,
}, { timestamps: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set the destination to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});
const upload = multer({ storage: storage });

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new todo
app.post('/todos', upload.single('image'), async (req, res) => {
  const { title, description, date } = req.body;
  const image = req.file ? req.file.filename : null;

  const todo = new Todo({
    title,
    description,
    date,
    image,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
