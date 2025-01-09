const Submission = require('../Models/submission');

// Submit form data
exports.submitForm = async (req, res) => {
  const { formId, userId, responses, deviceInfo } = req.body;

  // Validate required fields
  if (!formId || !responses || !Array.isArray(responses)) {
    return res.status(400).json({ error: 'Invalid or missing data.' });
  }

  try {
    const newSubmission = new Submission({
      formId: formId,
      userId: userId,
      submissionId: userId ? userId : `anon-${Date.now()}`,
      responses: responses,
      ipAddress: req.publicIp || req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress || null,
      deviceInfo
    });

    const existingSubmission = await Submission.findOne({ submissionId: newSubmission.submissionId });
    let submission;
    if (existingSubmission) {
      submission= await existingSubmission.updateOne({ $set: { responses: newSubmission.responses } });
    } else {
      submission = await newSubmission.save();
    }

    return res.status(201).json({
      message: 'Form submission saved successfully!',
      submission: submission,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};


// Get form submissions
exports.getSubmissions = async (req, res) => {
  try {
    // Fetch submissions for the form
    const submissions = await Submission.find({ formId: req.params.formId });

    // Return the submissions with some formatting
    const formattedSubmissions = submissions.map(submission => ({
      ...submission.toObject(),
      // Format the answers for better readability
      answers: submission.answers.map(answer => ({
        questionId: answer.questionId,
        correctAnswer: answer.correctAnswer,
        submittedAnswer: answer.submittedAnswer,
        isCorrect: answer.isCorrect,
      })),
    }));

    res.status(200).json({ totalSubmissions: submissions.length, formattedSubmissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
