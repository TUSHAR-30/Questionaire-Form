import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import "./FormsPage.css"

function FormsPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state


    const [forms,setForms]=useState([])

    function handleFormClick(formId){
        navigate(`/form/${formId}`)
    }

    useEffect(() => {
        async function getUserForms(){
            setLoading(true)
            try{
                const response = await axios.get(`${SERVER_URL}/forms`,{ withCredentials: true } );
                setForms(response.data.forms)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        getUserForms()
       
    }, [])
    return (
        <div className='formspage'>
             {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
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