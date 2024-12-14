import React, { createContext, useState } from 'react'
const CreateFormContext = createContext();

// Create the provider component
export function CreateFormProvider({ children }) {

    const [questions, setQuestions] = useState([
        {
            type: 'categorize', // Default to categorize question type
            categories: [],
            items: [],
            cloze: { questionText: '', blanks: [] }, // Add cloze data structure
        },
    ]);

    const [questionsV2, setQuestionsV2] = usestate([
        {
            type: 'categorize',
            categorize: [{ categoryName: "", items: ["",""] }],
            cloze: { question: "", answers: [{ itemSerialNumber: null, itemName: "" }] },
            comprehension: {
                description: { title: "", content: "" },
                questions: [ { question: "", answer: "", options: ["",""] } ]
            }
        }
    ])


    return (
        <CreateFormContext.Provider value={{ questions, setQuestions }}>
            {children}
        </CreateFormContext.Provider>
    )
}

export default CreateFormContext