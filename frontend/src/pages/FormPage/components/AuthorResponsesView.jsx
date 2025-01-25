import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../../../config';
import { useParams } from 'react-router-dom';
import Error404Page from '../../Error404Page/Error404Page';

function AuthorResponsesView() {
    const [responses, setResponses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { formId } = useParams();


    useEffect(() => {
        setLoading(true);
        async function fetchFormResponse() {
            try {
                const responses = await axios.get(`${SERVER_URL}/getFormResponses/${formId}`,
                    { withCredentials: true });
                console.log(responses.data);
                setResponses(responses.data);
            } catch (err) {
                console.log(err)
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchFormResponse()
    }, [])

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <Error404Page />; // Render the 404 error page
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='bg-white rounded-[30px] p-2 flex justify-between items-center'>
                <h2 className='text-2xl'>{responses.length} Responses</h2>
                {/* <span>View more</span> */}
            </div>

            {!responses.length ? (
                <div className='bg-white rounded-[30px] p-2 py-12 flex justify-center items-center text-3xl'>No responses yet</div>
            ) : (
                <div className='bg-white'>
                    <div className='flex gap-3 justify-between p-2 bg-gray-200 rounded-sm'>
                        <span>No.</span>
                        <span>Email</span>
                        <span>Date</span>
                        {/* <span>Questions</span> */}
                    </div>
                    <div className='p-1 h-[55vh] overflow-y-auto'>
                        {responses.map((response, index) => (
                            <div key={response.submissionId} className='flex gap-3 justify-between p-2 rounded-sm border-b border-black cursor-pointer hover:bg-gray-50'>
                                <span>{index + 1}</span>
                                <span className='text-[12px] sm:text-[14px]'>{response.userId}</span>
                                <span className='text-[12px] sm:text-[14px]'>{response.createdAt}</span>
                                {/* <span>{response.questionsAttempted}</span> */}
                            </div>
                        ))}
                    </div>

                </div>
            )}

        </div>
    )
}

export default AuthorResponsesView

