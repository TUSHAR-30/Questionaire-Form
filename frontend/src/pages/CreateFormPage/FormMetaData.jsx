import React, { useState } from 'react'

function FormMetaData() {
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');

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