import React, { useContext , useState } from 'react'
import EditFormContext from '../../../Context/EditFormContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ClientForm from './ClientForm';
import ClientAuthentication from './ClientAuthentication';

function ClientView() {
    const { continueWithSelectedEmail } = useContext(EditFormContext)
    const [loading, setLoading] = useState(false)

    return (
        <>
            {loading && <LoadingSpinner />}

            {continueWithSelectedEmail?<ClientForm />:<ClientAuthentication />}
          
        </>
    )
}

export default ClientView