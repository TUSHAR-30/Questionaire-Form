import React, { createContext, useEffect, useState } from 'react'
import transformDataToFrontendFormat from '../utils2';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import { useParams } from 'react-router-dom';
const EditFormContext = createContext();

// Create the provider component
export function EditFormProvider({ children }) {
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [updatedQuestions,setUpdatedQuestions]=useState([])
    const [updatedFormTitle,setUpdatedFormTitle]=useState("")
    const [updatedFormDescription,setUpdatedFormDescription]=useState("")
    const { formId } = useParams(); 

    useEffect(() => {
        async function getForm() {
            try {
                const response = await axios.get(`${SERVER_URL}/form/${formId}`, { withCredentials: true });
                const questions = transformDataToFrontendFormat(response.data.questions)
                setQuestions(JSON.parse(JSON.stringify(questions)));
                setUpdatedQuestions(JSON.parse(JSON.stringify(questions)));
                setFormTitle(response.data.title);
                setFormDescription(response.data.description);
                setUpdatedFormTitle(response.data.title)
                setUpdatedFormDescription(response.data.description)
            } catch (err) {
                console.log(err)
            }
        }

        getForm()

    }, [])

    return (
        <EditFormContext.Provider value={{ questions,updatedQuestions, formTitle , updatedFormTitle, formDescription, updatedFormDescription ,formId , setQuestions , setUpdatedQuestions ,setFormTitle , setUpdatedFormTitle, setFormDescription ,setUpdatedFormDescription }}>
            {children}
        </EditFormContext.Provider>
    )
}

export default EditFormContext