import React, { useState } from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner';
import AuthorQuestionsView from './AuthorQuestionsView';
import AuthorResponsesView from './AuthorResponsesView';

function AuthorView() {
   
    const [loading, setLoading] = useState(false)
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [pageMode,setPageMode]=useState(0)

    const handlePageMode=(pageMode)=>{
        setPageMode(pageMode)
    }

    return (
        <>
            {loading && <LoadingSpinner />}

            <div className='flex justify-center items-center gap-2 mb-3'>
                <span className={`cursor-pointer flex justify-center h-7 w-24 ${pageMode==0?'border-b-2 border-black':''}`} onClick={()=>handlePageMode(0)}>Questions</span>
                <span className={`cursor-pointer flex justify-center h-7 w-24 ${pageMode==1?'border-b-2 border-black':''}`} onClick={()=>handlePageMode(1)}>Responses</span>
            </div>
            
            {pageMode==0 && <AuthorQuestionsView setLoading={setLoading} isEditBtnClicked={isEditBtnClicked} setIsEditBtnClicked={setIsEditBtnClicked} isPreview={isPreview} setIsPreview={setIsPreview}/>}
            {pageMode==1 && <AuthorResponsesView />}


            
          
        </>
    )
}

export default AuthorView