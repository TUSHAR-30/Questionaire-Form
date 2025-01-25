const Form = require('../Models/form');
const Submission = require('../Models/submission');

exports.getClientResponse = async (req, res) => {
  try {
    // Fetch the submission object
    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) {
      return res.status(400).json("Submission Not found");
    }

    // Fetch the associated form
    const form = await Form.findById(submission.formId);
    if (!form) {
      return res.status(400).json("Form Not found");
    }

    return res.status(200).json(submission);
  } catch (error) {
    console.error('Error enriching submission:', error.message);
    throw error;
  }
}

// Get form submissions
exports.getFormResponses = async (req, res) => {
  try {
    // Fetch submissions for the form
    const submissions = await Submission.find({ formId: req.params.formId });
    const data = submissions.map((submission) => {
      let { userId, _id: submissionId, createdAt } = submission;

      createdAt = new Date(createdAt);
      const year = createdAt.getFullYear(); // 2025
      const month = (createdAt.getMonth() + 1).toString().padStart(2, '0'); // 01 (add 1 because getMonth() returns 0-based index)
      const date = createdAt.getDate().toString().padStart(2, '0'); // 25

      createdAt=`${date}-${month}-${year}` ;

      return {
        userId,
        submissionId,
        createdAt
      }
    })

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
