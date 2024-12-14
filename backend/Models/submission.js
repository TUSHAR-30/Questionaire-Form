const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId, // Reference to question
      correctAnswer: mongoose.Schema.Types.Mixed, // Correct answer for the question
      submittedAnswer: mongoose.Schema.Types.Mixed, // User-submitted answer
      isCorrect: Boolean, // Flag to track if the answer is correct
    },
  ],
  correctAnswerCount:Number,
  submissionId: { type: String, unique: true }, // To identify non-logged-in submissions
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', submissionSchema);
