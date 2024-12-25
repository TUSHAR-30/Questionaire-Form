import React, { createContext, useEffect, useState } from 'react'
import transformDataToFrontendFormat from '../utils2';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import { useParams } from 'react-router-dom';
const EditFormContext = createContext();

// Create the provider component
export function EditFormProvider({ children }) {
    const [loading,setLoading]=useState(false)
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [updatedQuestions,setUpdatedQuestions]=useState([])
    const [updatedFormTitle,setUpdatedFormTitle]=useState("")
    const [updatedFormDescription,setUpdatedFormDescription]=useState("")
    const { formId } = useParams(); 
    const [formAuthorId,setformAuthorId]=useState(null);

    useEffect(() => {
        async function getForm() {
            setLoading(true)
            try {
                const response = await axios.get(`${SERVER_URL}/form/${formId}`, { withCredentials: true });
                const questions = transformDataToFrontendFormat(response.data.questions)
                const formAuthorId=response.data.userId;
                setformAuthorId(formAuthorId)
                setQuestions(JSON.parse(JSON.stringify(questions)));
                setUpdatedQuestions(JSON.parse(JSON.stringify(questions)));
                setFormTitle(response.data.title);
                setFormDescription(response.data.description);
                setUpdatedFormTitle(response.data.title)
                setUpdatedFormDescription(response.data.description)
            } catch (err) {
                console.log(err)
            } finally{
                setLoading(false)
            }
        }

        getForm()

    }, [])

    return (
        <EditFormContext.Provider value={{ questions,updatedQuestions, formTitle , updatedFormTitle, formDescription, updatedFormDescription ,formId ,formAuthorId, setQuestions , setUpdatedQuestions ,setFormTitle , setUpdatedFormTitle, setFormDescription ,setUpdatedFormDescription }}>
             {loading ? (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            ):
            children
            }
        </EditFormContext.Provider>
    )
}

export default EditFormContext