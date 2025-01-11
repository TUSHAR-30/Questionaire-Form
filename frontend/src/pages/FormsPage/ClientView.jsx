import React, { useContext, useState } from 'react'
import EditFormContext from '../../Context/EditFormContext';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import { FcGoogle } from "react-icons/fc";
import FormMetaData from '../../components/FormMetaData';
import PreviewMode from '../../components/PreviewMode/PreviewMode';
import LoadingSpinner from '../../components/LoadingSpinner';

function ClientView() {
    const { questions, formTitle, formDescription, formId, formSubmissionUserEmail, setFormTitle, setFormDescription } = useContext(EditFormContext)
    const [loading, setLoading] = useState(false)


    const handleSelectAccount = () => {
        window.open(`${SERVER_URL}/selectAccount/google?accountSelectionOnly=true&formId=${formId}`, "_self");
    }

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
    return (
        <>
            {loading && <LoadingSpinner />}

            <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} isPreview={true} />

            <PreviewMode isDragEnabled={true} />

            <div className='formSubmit-container'>
                {!formSubmissionUserEmail && (
                    <p>Select your Google account in order to submit the form</p>
                )}
                {formSubmissionUserEmail && (
                    <p>You are submitting the form with this email id: {formSubmissionUserEmail}</p>
                )}
                <div className='formSubmit-btns'>
                    <button onClick={handleSelectAccount} className="google-login-button">
                        <FcGoogle size={20} />
                        {formSubmissionUserEmail ? "Change Email" : " Select Account"}
                    </button>
                    {formSubmissionUserEmail && (
                        <button className='formSubmit-btn' onClick={handleSubmitForm}>Submit Form</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ClientView
















