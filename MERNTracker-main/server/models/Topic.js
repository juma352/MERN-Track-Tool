import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mongodb', 'express', 'react', 'nodejs']
  },
  status: {
    type: String,
    required: true,
    enum: ['not-started', 'learning', 'completed'],
    default: 'not-started'
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  code_snippet: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
topicSchema.index({ user: 1, category: 1 });
topicSchema.index({ user: 1, status: 1 });

export default mongoose.model('Topic', topicSchema);