import express from 'express';
import Goal from '../models/Goal.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all goals for user
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id })
      .sort({ target_date: 1 });
    
    res.json(goals);
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

// Create new goal
router.post('/', async (req, res) => {
  try {
    const { title, description, target_date, priority } = req.body;

    // Validation
    if (!title || !target_date) {
      return res.status(400).json({ message: 'Title and target date are required' });
    }

    const goal = new Goal({
      user: req.user._id,
      title,
      description: description || '',
      target_date,
      priority: priority || 'medium'
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ message: 'Error creating goal' });
  }
});

// Update goal
router.put('/:id', async (req, res) => {
  try {
    const { title, description, target_date, completed, priority } = req.body;

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, target_date, completed, priority },
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({ message: 'Error updating goal' });
  }
});

// Delete goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

// Get upcoming goals (next 7 days)
router.get('/upcoming', async (req, res) => {
  try {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const goals = await Goal.find({
      user: req.user._id,
      completed: false,
      target_date: { $lte: nextWeek }
    }).sort({ target_date: 1 });

    res.json(goals);
  } catch (error) {
    console.error('Get upcoming goals error:', error);
    res.status(500).json({ message: 'Error fetching upcoming goals' });
  }
});

export default router;