const Submission = require('../Models/submission');

// Submit form data
exports.submitForm = async (req, res) => {
  const { formId, userId, responses, deviceInfo } = req.body;

  console.log(formId,userId)

  // Validate required fields
  if (!formId || !responses || !userId || !Array.isArray(responses)) {
    return res.status(400).json({ error: 'missing data.' });
  }

  const isExistingUserEmailWithThisForm=await Submission.findOne({ userId: userId , formId:formId })
  if(isExistingUserEmailWithThisForm){
    return res.status(401).json({ error: 'Form is already submitted with this given email.Change email' });
  }


  try {
    let newSubmission = new Submission({
      formId: formId,
      userId: userId,
      responses: responses,
      ipAddress: req.publicIp || req.connection.remoteAddress || null,
      deviceInfo
    });

   
    newSubmission = await newSubmission.save();

    // return res.status(201).json({
    //   message: 'Form submission saved successfully!',
    //   submission: newSubmission,
    // });

    // Send Thank You page HTML
    return res.status(201).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #4CAF50; }
          p { font-size: 18px; color: #555; }
        </style>
      </head>
      <body>
        <h1>Thank You!</h1>
        <p>Your form has been successfully submitted. We appreciate your response.</p>
        <p>If you have any questions, feel free to contact us.</p>
      </body>
      </html>
    `);


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
