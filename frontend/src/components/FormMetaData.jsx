import React from 'react'

function FormMetaData({ formTitle, setFormTitle, formDescription, setFormDescription, isPreview }) {

    const handleFormTitleChange = (e) => {
        setFormTitle(e.target.value);
    };

    const handleFormDescriptionChange = (e) => {
        setFormDescription(e.target.value);
    };

    return (
        <div className="form-details">
            <label>
                Form Title:
                <input
                    type="text"
                    value={formTitle}
                    onChange={handleFormTitleChange}
                    disabled={isPreview}
                />
            </label>
            <label>
                Form Description:
                <textarea
                    value={formDescription}
                    onChange={handleFormDescriptionChange}
                    disabled={isPreview}

                />
            </label>
        </div>
    )
}

export default FormMetaData