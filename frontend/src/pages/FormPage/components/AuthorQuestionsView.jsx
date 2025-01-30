import React, { useContext, useState } from 'react'
import EditFormContext from '../../../Context/EditFormContext';
import transformDataToBackendFormat from '../../../utils/transformDataToBackendFormat';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import ModeToggle from '../../../components/ModeToggle';
import FormMetaData from '../../../components/FormMetaData';
import CreateMode from '../../../components/CreateMode/CreateMode';
import PreviewMode from '../../../components/PreviewMode/PreviewMode';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PreviewFormMetaData from '../../../components/PreviewMode/PreviewFormMetaData';

function AuthorQuestionsView({ setLoading, isEditBtnClicked, setIsEditBtnClicked, isPreview, setIsPreview }) {
    const { questions, updatedQuestions, formTitle, updatedFormTitle, formDescription, updatedFormDescription, formId, setQuestions, setUpdatedQuestions, setFormTitle, setUpdatedFormTitle, setFormDescription, setUpdatedFormDescription } = useContext(EditFormContext)

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
        <>
            {isEditBtnClicked ? (
                <>
                    <div className='flex gap-4 justify-end mb-3'>
                        <span className='border border-black p-1 cursor-pointer rounded' onClick={handleSaveUpdatedForm}>Save Changes</span>
                        <span className='border border-black p-1 cursor-pointer rounded' onClick={handleCancelFormUpdation}>Cancel</span>
                    </div>
                    <ModeToggle isPreview={isPreview} handleMode={handleMode} />
                </>
            ) : (
                <div className='flex justify-end mb-3'>
                    <span className='cursor-pointer border border-black p-1 rounded' onClick={handleEditBtnClick}>Edit</span>
                </div>
            )}

            {!isEditBtnClicked || (isEditBtnClicked && isPreview)?(
                <PreviewFormMetaData formTitle={formTitle} formDescription={formDescription}/>
            ):(
                <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} />
            )
            }


            

            {isEditBtnClicked ? isPreview ? <PreviewMode /> : <CreateMode /> : <PreviewMode isDragEnabled={true} />}
        </>
    )
}

export default AuthorQuestionsView