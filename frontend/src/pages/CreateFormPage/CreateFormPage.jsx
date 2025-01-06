import React from 'react';
import FormMetaData from '../../components/FormMetaData';
import PreviewMode from '../../components/PreviewMode/PreviewMode';
import useCreateForm from '../../hooks/useCreateForm';
import ModeToggle from '../../components/ModeToggle';
import CreateMode from '../../components/CreateMode/CreateMode';
import "./CreateFormPage.css";

const CreateFormPage = () => {
  const {
    isPreview,
    formTitle,
    formDescription,
    loading,
    handleMode,
    handleSaveForm,
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
      <ModeToggle isPreview={isPreview} handleMode={handleMode} />
      <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} isPreview={isPreview} />
      {isPreview ? <PreviewMode /> : <CreateMode />}
    </div>
  );
};

export default CreateFormPage;