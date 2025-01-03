import React from 'react';
import FormMetaData from './FormMetaData';
import QuestionsList from './QuestionsList';
import Preview from '../../components/Preview/Preview';
import useCreateForm from '../../hooks/useCreateForm';
import "./CreateFormPage.css";

const CreateFormPage = () => {
  const {
    isPreview,
    formTitle,
    formDescription,
    loading,
    handleAddQuestion,
    handleSaveForm,
    handleMode,
    setFormTitle,
    setFormDescription,
  } = useCreateForm();

  return (
    <div className="create-form-container">
      {loading && <div className="loading-overlay"><div className="spinner"></div></div>}
      <div className='saveAndDeploy-container'>
        <button onClick={handleSaveForm}>Save Form</button>
        {/* <button>Save and Deploy</button> */}
      </div>
      <h2>Form</h2>

      <div className='createAndPreview-Toggle'>
        <button className={`${isPreview ? "" : "active"}`} onClick={() => handleMode(false)}>Create</button>
        <button className={`${isPreview ? "active" : ""}`} onClick={() => handleMode(true)}>Preview</button>
      </div>
      <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} isPreview={isPreview} />
      {isPreview ? (
        <Preview />
      ) : (
        <>
          <QuestionsList />
          <button className="add-question-btn" onClick={handleAddQuestion}>Add New Question</button>
        </>
      )
      }
    </div>
  );
};

export default CreateFormPage;