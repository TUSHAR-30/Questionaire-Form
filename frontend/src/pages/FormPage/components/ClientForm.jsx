import React, { useContext, useState } from 'react'
import EditFormContext from '../../../Context/EditFormContext';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import FormMetaData from '../../../components/FormMetaData';
import PreviewMode from '../../../components/PreviewMode/PreviewMode';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PreviewFormMetaData from '../../../components/PreviewMode/PreviewFormMetaData';

function ClientForm() {
    const { questions, formTitle, formDescription, formId, formSubmissionUserEmail, setFormTitle, setFormDescription } = useContext(EditFormContext)
    const [loading, setLoading] = useState(false)

    async function handleSubmitForm() {
        const deviceInfo = {
            userAgent: navigator.userAgent, // Browser's User-Agent string
            platform: navigator.platform,  // OS platform
            language: navigator.language,  // Preferred language
            screenResolution: `${window.screen.width}x${window.screen.height}`, // Screen resolution
        };

        const formData = {
            formId, userId: formSubmissionUserEmail, responses: questions, deviceInfo
        }
        setLoading(true)
        try {
            const response = await axios.post(`${SERVER_URL}/submitForm/${formId}`, formData, { withCredentials: true });
            console.log(response);
            // alert("Response Submitted Successfully")

            // Get the HTML response text
            const htmlContent = response.data;
            document.open();
            document.write(htmlContent);
            document.close();

        } catch (err) {
            console.log(err)
            if (err.status == 400) {
                alert("Missing data")
            }
            else if (err.status == 401) {
                alert("Form submisstion failed . You have already submitted this form with this given email.Change email")
            }
        } finally {
            setLoading(false)
        }
    }

    if(loading){
        return <LoadingSpinner />
    }

    return (
        <div>
        <PreviewFormMetaData formTitle={formTitle} formDescription={formDescription}/>
        <PreviewMode isDragEnabled={true} />
        <div className="flex justify-center mt-4">
            <button 
                className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all font-medium' 
                onClick={handleSubmitForm}
            >
                Submit Form
            </button>
        </div>
    </div>
    )
}

export default ClientForm