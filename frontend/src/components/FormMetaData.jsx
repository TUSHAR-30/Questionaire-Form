import React from 'react'

function FormMetaData({ formTitle, setFormTitle, formDescription, setFormDescription }) {
    const handleFormTitleChange = (e) => {
        setFormTitle(e.target.value);
    };

    const handleFormDescriptionChange = (e) => {
        setFormDescription(e.target.value);
    };

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Form Title
                    <input
                        type="text"
                        value={formTitle}
                        onChange={handleFormTitleChange}
                        placeholder="Enter form title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </label>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Form Description
                    <textarea
                        value={formDescription}
                        onChange={handleFormDescriptionChange}
                        placeholder="Enter form description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                    />
                </label>
            </div>
        </div>
    )
}

export default FormMetaData