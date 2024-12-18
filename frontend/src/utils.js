const transformDataToBackendFormat = (questions) => {
  return questions
    .map((question) => {
      const commonFields = {
        type: question.type,
        imageUrl: question.imageUrl || '', // Optional field
      };

      if (question.type === 'categorize') {
        const categorize=validateCategorize(question)
        if(!categorize) return null
        return { ...commonFields, categorize: categorize };
      }

      else if (question.type === 'cloze') {
        const cloze=validateCloze(question)
        return { ...commonFields, cloze: cloze };
      }

      else if (question.type === 'comprehension') {
        const comprehension=validateComprehension(question)
        return { ...commonFields, comprehension: comprehension };
      }

    })
    .filter((question) => question !== null); // Remove invalid questions
};

export default transformDataToBackendFormat



const validateCategorize = (question) => {
  // Filter out invalid categories (empty spaces or no characters)
  const validCategories = question.categorize.categories.filter(
    (category) => category.trim() !== ''
  );

    // Check for duplicate categories
    const uniqueCategories = [...new Set(validCategories)];
    if (uniqueCategories.length !== validCategories.length) {
      alert('Categories must be unique.');
      return null;
    }

  // Filter out invalid items (empty spaces or no characters)
  const validItems = question.categorize.items.filter(
    (item) => item.name.trim() !== '' 
  );

   // Check for duplicate items
   const uniqueItemNames = [...new Set(validItems.map((item) => item.name))];
   if (uniqueItemNames.length !== validItems.length) {
     alert('Items must be unique.');
     return null;
   }

   //Check whether all items have a category or not
   const hasItemsWithoutCategory=validItems.find((item)=>item.category.trim() == '')
   if(hasItemsWithoutCategory){
    alert('Each item should have a category.');
    return null;
   }

  // Ensure there is at least one valid category and one valid item
  if (validCategories.length === 0 || validItems.length === 0) {
    // Skip this question as it's invalid
    return null;
  }

  // Map valid categories and their associated valid items
  const categorize = validCategories.map((category) => ({
    categoryName: category,
    items: validItems
      .filter((item) => item.category === category)
      .map((item) => item.name),
  }));

  return categorize

}

const validateCloze = (question) => {
  const cloze={
      question: question.cloze.originalText,
      answers: question.cloze.blanks.map((blank) => ({
        itemSerialNumber: blank.blankSerialNumber,
        itemName: blank.text,
      })),
  };
  return cloze;
}

const validateComprehension = (question) => {
  const { description, questions } = question.comprehension;

  // Validate title and description
  if (!description.title.trim() || !description.content.trim()) {
    alert('Title and description are required for comprehension questions.');
    return null;
  }

  // Validate questions
  const validQuestions = questions.filter((q) => {
    // Check if question, answer, and at least one option are present
    if (!q.question.trim()) {
      alert('Each comprehension question must have a question.');
      return false;
    }
    if (!q.options || q.options.length === 0) {
      alert('Each comprehension question must have at least one option.');
      return false;
    }
    if (!q.answer.trim()) {
      alert('Each comprehension question must have an answer.');
      return false;
    }
    return true;
  });

  // If no valid questions are found, the comprehension is invalid
  if (validQuestions.length === 0) {
    alert('There must be at least one valid question in the comprehension.');
    return null;
  }

  // Transform valid questions for backend format
  const comprehension = {
    description: {
      title: description.title.trim(),
      content: description.content.trim(),
    },
    questions: validQuestions.map((q) => ({
      question: q.question.trim(),
      answer: q.answer.trim(),
      options: q.options.map((option) => option.text.trim()).filter(Boolean), // Trim options and remove empty ones
    })),
  };

  return comprehension;
};

