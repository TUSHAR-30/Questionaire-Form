import React, { createContext, useState } from 'react'
const CreateFormContext = createContext();

// Create the provider component
export function CreateFormProvider({ children }) {

    // const [questions, setQuestions] = useState([
    //     {
    //         type: 'categorize', // Default to categorize question type
    //         categories: [],
    //         items: [],
    //         cloze: { blanks: [] }, // Add cloze data structure
    //         comprehension: { 
    //             description: { title: '', content: '' },
    //             questions: [{ question: '', answer: '', options: [] }]
    //           },
    //     },
    // ]);

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

    return (
        <CreateFormContext.Provider value={{ questions, setQuestions }}>
            {children}
        </CreateFormContext.Provider>
    )
}

export default CreateFormContext