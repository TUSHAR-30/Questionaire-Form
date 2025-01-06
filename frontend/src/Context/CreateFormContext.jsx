import React, { createContext, useState } from 'react'
const CreateFormContext = createContext();

// Create the provider component
export function CreateFormProvider({ children }) {

    const [questions, setQuestions] = useState([
        {
          type: 'categorize', // Default question type
          categorize: { categories: [], items: [] }, // Nested under "categorize"
          cloze: { blanks: [] },
          comprehension: {
            description: { title: '', content: '' },
            questions: [{ question: '', answer: '', options: [] }],
          },
        },
      ]);

      const handleAddQuestion = () => {
        setQuestions([
          ...questions,
          {
            type: 'categorize', // Default question type
            categorize: { categories: [], items: [] },
            cloze: { blanks: [] },
            comprehension: {
              description: { title: '', content: '' },
              questions: [{ question: '', answer: '', options: [] }],
            },
          },
        ]);
      };

    return (
        <CreateFormContext.Provider value={{ questions, handleAddQuestion , setQuestions }}>
            {children}
        </CreateFormContext.Provider>
    )
}

export default CreateFormContext