import React, { useContext } from 'react';
import { useAppContext } from '../../App';
import EditFormContext from '../../Context/EditFormContext';
import AuthorView from './components/AuthorView';
import ClientView from './components/ClientView';

function FormPage() {
    const { user } = useAppContext();
    const { formAuthorId } = useContext(EditFormContext)

    return (
        <div className="max-w-[900px] my-5 mx-auto px-4 bg-blue-50">
            {
                formAuthorId == user?._id ? <AuthorView /> : <ClientView />
            }
        </div>
    );
}

export default FormPage;

