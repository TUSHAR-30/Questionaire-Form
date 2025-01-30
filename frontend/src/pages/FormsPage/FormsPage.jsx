import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import LoadingSpinner from '../../components/LoadingSpinner';
import { dateConverter } from '../../utils/DateFormat';

function FormsPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState([]);

    const handleFormClick = (formId) => {
        navigate(`/form/${formId}`);
    };

    useEffect(() => {
        async function getUserForms() {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/forms`, { withCredentials: true });
                setForms(response.data.forms);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getUserForms();
    }, []);

    if(loading){
        return <LoadingSpinner />
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Your Forms</h2>
                {forms.length === 0 ? (
                    <div className="text-center text-gray-500 text-xl">
                        You haven't created any forms yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {forms.map((form, index) => (
                            <div
                                key={form._id}
                                className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => handleFormClick(form._id)}
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {index + 1}. {form.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            <strong>Created:</strong> {dateConverter(form.createdAt)}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            <strong>Responses:</strong> {form.submissionCount}
                                        </p>
                                    </div>
                                    <div className="mt-2 md:mt-0">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                form.isDeployed
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {form.isDeployed ? 'Deployed' : 'Deployed'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormsPage;
