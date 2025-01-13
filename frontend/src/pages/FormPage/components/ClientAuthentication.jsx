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
        <div className='formSubmit-container'>
            {isDuplicateRequestForFormSubmissionEmail ? (
                <>
                <p>You have already filled this from with the {formSubmissionUserEmail}</p>
                </>
            ) : (
                !formSubmissionUserEmail ? (<p>Select your Google account in order to submit the form</p>)
                    : (<p>You are going to fill the form with this email id: {formSubmissionUserEmail}</p>)
            )}

            <div className='formSubmit-btns'>
                <button onClick={handleSelectAccount} className="google-login-button">
                    <FcGoogle size={20} />
                    {formSubmissionUserEmail ? "Change Email" : " Select Account"}
                </button>
                {isDuplicateRequestForFormSubmissionEmail==false && <button onClick={handleContinueBtnClick}>Continue</button>}
            </div>
        </div>
    )
}

export default ClientAuthentication