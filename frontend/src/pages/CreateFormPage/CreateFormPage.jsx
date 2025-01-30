import React from 'react';
import FormMetaData from '../../components/FormMetaData';
import PreviewMode from '../../components/PreviewMode/PreviewMode';
import useCreateForm from '../../hooks/useCreateForm';
import ModeToggle from '../../components/ModeToggle';
import CreateMode from '../../components/CreateMode/CreateMode';
import LoadingSpinner from '../../components/LoadingSpinner';
import "./CreateFormPage.css";
import PreviewFormMetaData from '../../components/PreviewMode/PreviewFormMetaData';

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
    <div className="max-w-[900px] m-auto py-3 px-1">
      {loading && <LoadingSpinner />}
      <div className='flex gap-1 justify-end'>
        <button onClick={handleSaveForm} className='border border-black p-1'>Save Form</button>
        {/* <button>Save and Deploy</button> */}
      </div>
      <h2 className='text-center text-3xl mb-5'>Form</h2>
      <ModeToggle isPreview={isPreview} handleMode={handleMode} />
      {isPreview?(
        <PreviewFormMetaData formTitle={formTitle} formDescription={formDescription}/>
      ):(
      <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} />

      )}
      {isPreview ? <PreviewMode /> : <CreateMode />}
    </div>
  );
};

export default CreateFormPage;