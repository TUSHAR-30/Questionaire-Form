import React, { useContext , useState } from 'react';
import EditFormContext from '../../Context/EditFormContext';
import transformDataToBackendFormat from '../../utils/transformDataToBackendFormat';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import { useAppContext } from "../../App";
import ModeToggle from '../../components/ModeToggle';
import FormMetaData from '../../components/FormMetaData';
import CreateMode from '../../components/CreateMode/CreateMode';
import PreviewMode from '../../components/PreviewMode/PreviewMode';


function FormPage() {
    const { isAuthenticated, user } = useAppContext();
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const { questions, updatedQuestions, formTitle, updatedFormTitle, formDescription, updatedFormDescription, formId, formAuthorId, setQuestions, setUpdatedQuestions, setFormTitle, setUpdatedFormTitle, setFormDescription, setUpdatedFormDescription } = useContext(EditFormContext)
    const [loading, setLoading] = useState(false)

    const handleMode = (isPreview) => {
        setIsPreview(isPreview)
    }

    const handleCancelFormUpdation = () => {
        setQuestions(JSON.parse(JSON.stringify(updatedQuestions)));
        setFormTitle(updatedFormTitle);
        setFormDescription(updatedFormDescription);
        setIsEditBtnClicked(false);
    }

    const handleEditBtnClick = () => {
        setIsPreview(false);
        setIsEditBtnClicked(true)
    }

    async function handleSubmitForm() {
        console.log(questions)
        const formData = {
            formId, userId: user._id, responses: questions
        }
        setLoading(true)
        try {
            const response = await axios.post(`${SERVER_URL}/submitForm/${formId}`, formData, { withCredentials: true });
            console.log(response);
            alert("Response Submitted Successfully")
        } catch (err) {
            console.log(err)
            alert("Error occured while submitting form")
        } finally {
            setLoading(false)
        }
    }

    async function handleSaveUpdatedForm() {
        const transformedQuestions = transformDataToBackendFormat(questions, formTitle, formDescription)
        // Check if all questions were filtered out (invalid input)
        if (transformedQuestions.length === 0) {
            alert('Form cannot be submitted. Please ensure all fields are valid.');
            return;
        }

        const formData = {
            title: formTitle,
            description: formDescription,
            questions: transformedQuestions,
            isDeployed: false,
        };
        setLoading(true)
        try {
            const response = await axios.put(`${SERVER_URL}/form/${formId}`, formData, { withCredentials: true });
            console.log('Form submitted successfully:', response.data);
            setIsEditBtnClicked(false);
            setUpdatedQuestions(JSON.parse(JSON.stringify(questions)))
            setUpdatedFormTitle(formTitle);
            setUpdatedFormDescription(formDescription)
            alert("Form edited successfully")
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="created-questions-list-Preview">
            {loading && (<div className="loading-overlay"><div className="spinner"></div></div>)}
            {isEditBtnClicked ? (
                <>
                    <div className='saveAndCancel-container'>
                        <span onClick={handleSaveUpdatedForm}>Save Changes</span>
                        <span onClick={handleCancelFormUpdation}>Cancel</span>
                    </div>
                    <ModeToggle isPreview={isPreview} handleMode={handleMode} />
                </>

            ) : (
                formAuthorId === user?._id && <div className='edit-form-btn-container'>
                    <span className='edit-form-btn' onClick={handleEditBtnClick}>Edit</span>
                </div>
            )}

            <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} isPreview={!isEditBtnClicked || (isEditBtnClicked && isPreview)} />

            { isEditBtnClicked ? isPreview ? <PreviewMode />: <CreateMode /> : <PreviewMode isDragEnabled={true}/> }

            {formAuthorId != user?._id && <button style={{ alignSelf: 'flex-end' }} className="add-question-btn" onClick={handleSubmitForm}>Submit Form</button>}
        </div>
    );
}

export default FormPage;
