const Submission = require('../models/submission');
const Form = require('../models/form');

// Submit form data
exports.submitForm = async (req, res) => {
  const { answers } = req.body;
  const formId = req.params.formId;

  let userId, correctAnswerCount = 0;
  if (req.user) userId = req.user.id;

  try {
    // Validate form existence
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found." });
    }

    // Validate input structure
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid or missing answers array." });
    }

    const processedAnswers = [];

    // Iterate through the submitted answers
    for (const submittedAnswer of answers) {
      const { questionId, answer: submittedAnswerData } = submittedAnswer;

      // Validate questionId and answer existence
      if (!questionId || !submittedAnswerData) {
        return res
          .status(400)
          .json({ error: `Invalid answer format for questionId: ${questionId}` });
      }

      // Fetch the question from the database
      const question = await Form.findOne({ "questions._id": questionId }, { "questions.$": 1 });
      if (!question) {
        return res.status(404).json({ error: `Question not found for ID: ${questionId}` });
      }

      const formQuestion = question.questions[0];
      let isCorrect = false;
      let correctAnswer;

      // Determine correctness and store the correct answer
      switch (formQuestion.type) {
        case "categorize":
          correctAnswer = formQuestion.categorize;

          // Ensure both `correctAnswer` and `submittedAnswerData` are arrays of objects
          if (Array.isArray(correctAnswer) && Array.isArray(submittedAnswerData)) {
            // Compare the categories and items
            isCorrect = correctAnswer.every((category) => {
              const submittedCategory = submittedAnswerData.find(
                (cat) => cat.categoryName === category.categoryName
              );

              if (!submittedCategory) return false;

              // Ensure items match exactly, regardless of order
              const correctItems = [...category.items].sort();
              const submittedItems = [...submittedCategory.items].sort();

              return JSON.stringify(correctItems) === JSON.stringify(submittedItems);
            });
          } else {
            isCorrect = false;
          }
          break;

        case "cloze":
          correctAnswer = formQuestion.cloze.answers.map((item) => item.itemName);
          const userClozeAnswers = submittedAnswerData.map((item) => item.itemName);

          isCorrect = JSON.stringify(correctAnswer) === JSON.stringify(userClozeAnswers);
          break;

        case "comprehension":
          correctAnswer = formQuestion.comprehension.questions.map((q) => ({
            question: q.question,
            answer: q.answer,
          }));
          isCorrect = submittedAnswerData.every((item, index) =>(
            item.answer === correctAnswer[index].answer
          )
          );
          break;

        default:
          return res.status(400).json({ error: `Unsupported question type for ID: ${questionId}` });
      }

      if (isCorrect) correctAnswerCount++;

      // Store processed answer with correctness flag, submitted and correct answers
      processedAnswers.push({
        questionId,
        correctAnswer,
        submittedAnswer: submittedAnswerData,
        isCorrect,
      });
    }

    // Generate submission ID
    const submissionId = userId ? userId : `anon-${Date.now()}`;

    // Create and save submission
    const newSubmission = new Submission({
      formId,
      userId,
      answers: processedAnswers,
      submissionId,
      correctAnswerCount
    });
    await newSubmission.save();

    res.status(201).json({ correctAnswerCount, newSubmission });
  } catch (err) {
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
        submittedAnswer:answer.submittedAnswer,
        isCorrect: answer.isCorrect,
      })),
    }));

    res.status(200).json({totalSubmissions:submissions.length,formattedSubmissions});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
