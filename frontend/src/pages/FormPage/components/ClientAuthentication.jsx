import React, { useContext, useState } from 'react'
import EditFormContext from '../../../Context/EditFormContext';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from '../../../components/LoadingSpinner';

function ClientAuthentication() {
    const { formId, formSubmissionUserEmail, isDuplicateRequestForFormSubmissionEmail, handleContinueBtnClick } = useContext(EditFormContext)
    const [loading, setLoading] = useState(false)

    const handleSelectAccount = () => {
        window.open(`${SERVER_URL}/selectAccount/google?accountSelectionOnly=true&formId=${formId}`, "_self");
    }

    return (
        <div className='bg-gray-300 rounded-lg py-2 flex flex-col items-center p-1'>
            <div className='text-[13px]'>
                {isDuplicateRequestForFormSubmissionEmail ? (
                    <p>You have already filled this from with the {formSubmissionUserEmail}</p>
                ) : (
                    !formSubmissionUserEmail ? (<p>Select your Google account in order to submit the form</p>)
                        : (<p>The form will be submitted with this email id: {formSubmissionUserEmail}</p>)
                )}
            </div>

            <div className='flex gap-3 mt-2'>
                <button onClick={handleSelectAccount} className="flex gap-2 border border-black px-1 py-1 bg-gray-300 items-center">
                    <FcGoogle size={20} />
                    {formSubmissionUserEmail ? "Change Email" : " Select Account"}
                </button>
                {isDuplicateRequestForFormSubmissionEmail == false && <button onClick={handleContinueBtnClick}
                    className='border border-black px-1 py-1 bg-gray-300'
                >Continue</button>}
            </div>
        </div>
    )
}

export default ClientAuthentication