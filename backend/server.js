const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// !!! IMPORTANT: CHANGE THIS TO YOUR DATABASE VM IP !!!
const DATABASE_VM_IP = '192.168.142.133'; // CHANGE THIS IP
const MONGODB_URI = `mongodb://${DATABASE_VM_IP}:27017/monster_hunter_wiki`;

console.log(`Attempting to connect to MongoDB at: ${MONGODB_URI}`);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB on Database VM'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Monster Schema
const monsterSchema = new mongoose.Schema({
  name: String,
  species: String,
  elements: [String],
  weaknesses: [String],
  locations: [String],
  description: String,
  image_url: String
});

const Monster = mongoose.model('Monster', monsterSchema);

// API Routes

// Get all monsters
app.get('/api/monsters', async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.json(monsters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search monsters
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};
    
    if (q && q.trim()) {
      query.$text = { $search: q };
    }
    
    const monsters = await Monster.find(query);
    res.json(monsters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monster by name
app.get('/api/monsters/:name', async (req, res) => {
  try {
    const monster = await Monster.findOne({ name: req.params.name });
    if (!monster) {
      return res.status(404).json({ error: 'Monster not found' });
    }
    res.json(monster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get species list for filters
app.get('/api/species', async (req, res) => {
  try {
    const species = await Monster.distinct('species');
    res.json(species);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', mongodb: mongoose.connection.readyState === 1 });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Server running on http://0.0.0.0:${PORT}`);
  console.log(`📡 Waiting for frontend connections...`);
});
