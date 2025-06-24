import express from 'express';
import Topic from '../models/Topic.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all topics for user
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(topics);
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ message: 'Error fetching topics' });
  }
});

// Create new topic
router.post('/', async (req, res) => {
  try {
    const { name, category, status, progress, notes, code_snippet } = req.body;

    // Validation
    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
    }

    const topic = new Topic({
      user: req.user._id,
      name,
      category,
      status: status || 'not-started',
      progress: progress || 0,
      notes: notes || '',
      code_snippet: code_snippet || ''
    });

    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ message: 'Error creating topic' });
  }
});

// Update topic
router.put('/:id', async (req, res) => {
  try {
    const { name, category, status, progress, notes, code_snippet } = req.body;

    const topic = await Topic.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, category, status, progress, notes, code_snippet },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error('Update topic error:', error);
    res.status(500).json({ message: 'Error updating topic' });
  }
});

// Delete topic
router.delete('/:id', async (req, res) => {
  try {
    const topic = await Topic.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({ message: 'Error deleting topic' });
  }
});

// Get topics by category
router.get('/category/:category', async (req, res) => {
  try {
    const topics = await Topic.find({
      user: req.user._id,
      category: req.params.category
    }).sort({ createdAt: -1 });

    res.json(topics);
  } catch (error) {
    console.error('Get topics by category error:', error);
    res.status(500).json({ message: 'Error fetching topics by category' });
  }
});

export default router;