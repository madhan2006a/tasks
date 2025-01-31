import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI || `mongodb+srv://viveghav2023ece:HsnDB@cluster0.djzjb.mongodb.net/project3?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; 

// **User Schema**
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// **Flashcard Schema**
const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  level: { type: String, required: true },
  flipCount: { type: Number, default: 0 },
  isFlipped: { type: Boolean, default: false }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// **User Registration Route**
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// **User Login Route**
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});

// **Middleware to Verify Token**
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// **Flashcard Routes (Protected)**
app.get('/flashcards', verifyToken, async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: "Error fetching flashcards", error: err });
  }
});

app.post('/flashcards', verifyToken, async (req, res) => {
  const { question, answer, level } = req.body;

  if (!question || !answer || !level) {
    return res.status(400).json({ message: "All fields (question, answer, level) are required" });
  }

  try {
    const newFlashcard = new Flashcard({ question, answer, level });
    await newFlashcard.save();
    res.status(201).json({ message: "Flashcard added", flashcard: newFlashcard });
  } catch (err) {
    res.status(500).json({ message: "Error adding flashcard", error: err });
  }
});

app.put('/flashcards/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { question, answer, level } = req.body;

  if (!question || !answer || !level) {
    return res.status(400).json({ message: "All fields (question, answer, level) are required" });
  }

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(id, { question, answer, level }, { new: true });
    if (updatedFlashcard) {
      res.json({ message: "Flashcard updated", flashcard: updatedFlashcard });
    } else {
      res.status(404).json({ message: "Flashcard not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating flashcard", error: err });
  }
});

app.delete('/flashcards/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
    if (deletedFlashcard) {
      res.json({ message: "Flashcard deleted", flashcard: deletedFlashcard });
    } else {
      res.status(404).json({ message: "Flashcard not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting flashcard", error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});