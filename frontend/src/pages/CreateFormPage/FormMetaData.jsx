import React from 'react'

function FormMetaData({formTitle, setFormTitle,formDescription, setFormDescription}) {
   

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
                />
            </label>
            <label>
                Form Description:
                <textarea
                    value={formDescription}
                    onChange={handleFormDescriptionChange}
                />
            </label>
        </div>
    )
}

export default FormMetaData