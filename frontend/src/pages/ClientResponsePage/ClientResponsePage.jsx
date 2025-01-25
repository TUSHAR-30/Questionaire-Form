import axios from 'axios'
import React, { useEffect } from 'react'
import { SERVER_URL } from '../../../config'

function ClientResponsePage() {
    useEffect(async()=>{
        async function fetchClientResponse(){
            const response=await axios.get(`${SERVER_URL}/clientResponse/${submissionId}`,
            { withCredentials: true });
            console.log(response);
        }
        fetchClientResponse()
    },[])
  return (
    <div>ClientResponsePage</div>
  )
}

export default ClientResponsePage