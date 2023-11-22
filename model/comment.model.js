const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],
  upvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  downvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
}, { timestamps: true });

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;

