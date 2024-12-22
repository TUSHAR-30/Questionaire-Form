const transformDataToFrontendFormat = (backendQuestions) => {
    return backendQuestions.map((backendQuestion) => {
      const { type, imageUrl, categorize, cloze, comprehension } = backendQuestion;
  
      const commonFields = {
        type,
        imageUrl: imageUrl || '',
      };
  
      if (type === 'categorize') {
        return {
          ...commonFields,
          categorize: transformCategorizeToFrontend(categorize),
        };
      } else if (type === 'cloze') {
        return {
          ...commonFields,
          cloze: transformClozeToFrontend(cloze),
        };
      } else if (type === 'comprehension') {
        return {
          ...commonFields,
          comprehension: transformComprehensionToFrontend(comprehension),
        };
      }
      return null; // For unsupported types
    }).filter(Boolean); // Remove null values for unsupported types
  };
  
  // Transform categorize data
  const transformCategorizeToFrontend = (categorize) => {
    const categories = categorize.map((category) => category.categoryName);
    const items = categorize.flatMap((category,categoryIndex) =>
      category.items.map((item,itemIndex) => ({
        name: item,
        category: category.categoryName,
      }))
    );
    return { categories, items };
  };
  
  // Transform cloze data
  const transformClozeToFrontend = (cloze) => {
    return {
      displayText: cloze.displayQuestion,
      originalText:cloze.originalQuestion,
      blanks: cloze.answers.map((answer) => ({
        blankSerialNumber: answer.itemSerialNumber,
        text: answer.itemName,
        id:`${Date.now()}-${Math.random()}`,
        start:answer.start,
        end:answer.end
      })),
    };
  };
  
  // Transform comprehension data
  const transformComprehensionToFrontend = (comprehension) => {
    const { description, questions } = comprehension;
  
    return {
      description: {
        title: description.title,
        content: description.content,
      },
      questions: questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        options: q.options.map((option,index) => ({ text: option, id: `${Date.now()}-${Math.random()}`})),
      })),
    };
  };
  
  export default transformDataToFrontendFormat;
  