const Form = require('../Models/form');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');

const { validateQuestionSchema } = require("../utils")

async function requestedRouteClient(req, form) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return false
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return false;
    if (user._id.toString() != form.userId.toString()) return false;
    return true;
  } catch (err) {
    console.log("err", err)
    return false;
  }

}

const processFormResponse = (form, isAuthor) => {
  // Clone the form object to avoid mutating the original data
  const processedForm = JSON.parse(JSON.stringify(form));

  processedForm.questions = processedForm.questions.map((question) => {
    if (question.type === 'cloze' && !isAuthor) {
      // Remove specific fields from 'cloze' question type
      delete question.cloze.originalQuestion;
      question.cloze.blanks.forEach((blank) => {
        delete blank.itemSerialNumber;
        delete blank.start;
        delete blank.end;
      });
    }

    if (question.type === 'comprehension' && !isAuthor) {
      // Remove 'answer' field from 'comprehension' question type
      question.comprehension.questions.forEach((q) => {
        delete q.answer;
      });
    }

    if (question.type === 'categorize') {
      // Transform categorize array into an object
      const categories = question.categorize.map((cat) => cat.categoryName);
      const items = question.categorize.flatMap((cat) =>  cat.items.map((item,itemIndex) => ({
        name: item,
        category: isAuthor?cat.categoryName:undefined,
      }))
    )

      question.categorize = {
        categories,
        items,
      };
    }

    return question;
  });

  return processedForm;
};


// Create form
exports.createForm = async (req, res) => {
  const { title, description, questions } = req.body;
  const userId = req.user.id;
  try {

    // Validate each question's structure
    for (const question of questions) {
      validateQuestionSchema(question);
    }

    const newForm = new Form({ title, description, questions, userId });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update form
exports.updateForm = async (req, res) => {
  const { title, description, questions } = req.body;

  try {

    // Validate each question's structure
    for (const question of questions) {
      validateQuestionSchema(question);
    }

    const updatedForm = await Form.findByIdAndUpdate(
      req.params.formId,
      { title, description, questions },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validations
      }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: `Form with ID ${req.params.formId} does not found in your account` });
    }

    res.status(200).json(updatedForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Deploy form
exports.deployForm = async (req, res) => {
  try {
    console.log(req.params.formId)
    console.log(req.user.id)

    const form = await Form.findOne({ _id: req.params.formId, userId: req.user.id });
    if (!form) {
      return res.status(404).json({ message: `Form with ID ${req.params.formId} does not found in your account` });
    }

    form.isDeployed = true;
    await form.save();
    res.status(200).json({ message: 'Form deployed successfully', form });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get formAuthorId
exports.getFormAuthorId = async (req, res) => {
  try {
    let form = await Form.findById(req.params.formId);
    if (!form) {
      return res.status(404).json({ message: `Form with ID ${req.params.formId} not found in your account` });
    }
    const formAuthorId = form.userId
    res.status(200).json(formAuthorId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Get form
exports.getForm = async (req, res) => {
  try {
    let form = await Form.findById(req.params.formId);
    if (!form) {
      return res.status(404).json({ message: `Form with ID ${req.params.formId} not found in your account` });
    }
    const isAuthor = await requestedRouteClient(req, form);
    const processedForm = processFormResponse(form, isAuthor);
    res.status(200).json(processedForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all Forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.user.id });
    res.status(200).json({ count: forms.length, forms });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete form
exports.deleteForm = async (req, res) => {
  try {

    const deletedForm = await Form.findOneAndDelete({ _id: req.params.formId, userId: req.user.id });

    if (!deletedForm) {
      return res.status(404).json({ message: `Form with ID ${req.params.formId} not found in your account` });
    }

    res.status(200).json({ message: 'Form deleted successfully', deletedForm });
  } catch (err) {
    console.error('Error deleting form:', err);
    res.status(500).json({ error: err.message });
  }
};

