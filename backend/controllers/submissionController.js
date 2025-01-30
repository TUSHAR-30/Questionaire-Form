const Submission = require('../Models/submission');
const Form = require('../Models/form');

async function addAnswersInSubmission(form, responses) {

  // Iterate through the submission responses
  return responses.map((response, index) => {
    const formQuestion = form.questions[index]
    if (!formQuestion) return;

    // Add correct answers based on question type
    if (response.type === 'categorize') {
      response.categorize.items.forEach((item) => {
        const correctCategory = formQuestion.categorize.find((cat) =>
          cat.items.includes(item.name)
        );
        if (correctCategory) {
          item.correctCategory = correctCategory.categoryName;
        }
      });
    }
    else if (response.type === 'cloze') {
      response.cloze.blanks.forEach((blank) => {
        const correctBlank = formQuestion.cloze.blanks.find(
          (b) => b.itemName === blank.text
        );
        if (correctBlank) {
          blank.correctId = correctBlank.itemSerialNumber;
        }
      });
    }
    else if (response.type === 'comprehension') {
      response.comprehension.questions.forEach((question,index) => {
        const formComprehensionQuestion = formQuestion.comprehension.questions[index];
        const answerIndex=formComprehensionQuestion.options.findIndex(
          (option) => option == formComprehensionQuestion.answer
        )
        question.correctAnswer = answerIndex;
      });
    }
    return response;
  });

}

// Submit form data
exports.submitForm = async (req, res) => {
  const { formId, userId, responses, deviceInfo } = req.body;

  // Validate required fields
  if (!formId || !responses || !userId || !Array.isArray(responses)) {
    return res.status(400).json({ error: 'missing data.' });
  }

  const isExistingUserEmailWithThisForm = await Submission.findOne({ userId: userId, formId: formId })
  if (isExistingUserEmailWithThisForm) {
    return res.status(401).json({ error: 'Form is already submitted with this given email.Change email' });
  }

  const form = await Form.findById(formId);
  const updatedResponses = await addAnswersInSubmission(form, responses)
  // console.log(updatedResponses);

  try {
    let newSubmission = new Submission({
      formId: formId,
      userId: userId,
      responses: updatedResponses,
      ipAddress: req.publicIp || req.connection.remoteAddress || null,
      deviceInfo
    });


    newSubmission = await newSubmission.save();
    form.submissionCount++;
    await form.save();

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

