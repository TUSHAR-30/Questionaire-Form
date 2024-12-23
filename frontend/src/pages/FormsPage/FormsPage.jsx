import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import "./FormsPage.css"

function FormsPage() {
    const navigate = useNavigate();

    const [forms,setForms]=useState([])

    function handleFormClick(formId){
        navigate(`/form/${formId}`)
    }

    useEffect(() => {
        async function getUserForms(){
            try{
                const response = await axios.get(`${SERVER_URL}/forms`,{ withCredentials: true } );
                console.log(response.data.forms)
                setForms(response.data.forms)
            }catch(err){
                console.log(err)
            }
        }

        getUserForms()
       
    }, [])
    return (
        <div className='formspage'>
            <h2>Your Forms</h2>
            <div className='formsDashboard'>
            {forms.map((form,index)=>(
                <div key={index} className='formDashboard' onClick={()=>handleFormClick(form._id)}>
                    <span>{index+1}.</span>
                    <span>{form.title}</span>
                    <span className='deploy-status'>{form.isDeployed?"Deployed":"Not Deployed"}</span>
                </div>
            ))}
            </div>
          
        </div>
    )
}

export default FormsPage