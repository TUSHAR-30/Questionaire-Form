import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../../config'
import { useParams } from 'react-router-dom'
import Error404Page from '../Error404Page/Error404Page'
import PreviewClientResponseQuestionItem from './PreviewClientResponseQuestionItem'
import transformDataToFrontendFormat from '../../utils/transformDataToFrontendFormat'

function ClientResponsePage() {
  const { submissionId } = useParams()
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] =useState(null)

  useEffect(() => {
     async function fetchClientResponse() {
      try {
        setLoading(true)
        const response = await axios.get(`${SERVER_URL}/clientResponse/${submissionId}`,
          { withCredentials: true });
        console.log(response.data.responses);
        const questions = transformDataToFrontendFormat(response.data.responses,true);
        setQuestions(questions)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false);
      }
    }
    fetchClientResponse()
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
    <div className='max-w-[900px] m-auto flex flex-col gap-3 p-3'>
      {questions.map((question, questionIndex) => (
        <PreviewClientResponseQuestionItem key={questionIndex} question={question} questionIndex={questionIndex} />
      ))}
    </div>
  )
}

export default ClientResponsePage