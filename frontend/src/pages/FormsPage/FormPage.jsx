import React, { useContext } from 'react';
import { useAppContext } from '../../App';
import EditFormContext from '../../Context/EditFormContext';
import AuthorView from './AuthorView';
import ClientView from './ClientView';

function FormPage() {
    const { user } = useAppContext();
    const { formAuthorId } = useContext(EditFormContext)

    return (
        <div className="created-questions-list-Preview">

            {
                formAuthorId == user?._id ? <AuthorView /> : <ClientView />
            }

        </div>
    );
}

export default FormPage;
