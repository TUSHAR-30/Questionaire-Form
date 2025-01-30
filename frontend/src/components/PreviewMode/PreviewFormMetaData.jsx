import React, { useState } from "react";

function PreviewFormMetaData({formTitle, formDescription}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const content = formDescription;
  const maxLength = 400;
  const isContentLong = content.length > maxLength;

  return (
    <div className="flex flex-col gap-2 mb-4 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-center text-3xl font-bold text-blue-900">{formTitle}</h1>
      <p className="relative text-center text-gray-700">
        {isExpanded || !isContentLong
          ? content
          : `${content.slice(0, maxLength)}...`}
        {isContentLong && !isExpanded && (
          <button
            className="text-blue-600 hover:text-blue-700 ml-2 font-medium"
            onClick={handleToggle}
          >
            Read More
          </button>
        )}
      </p>
      {isExpanded && isContentLong && (
        <button
          className="text-blue-600 hover:text-blue-700 mt-2 font-medium"
          onClick={handleToggle}
        >
          View Less
        </button>
      )}
    </div>
  );
}

export default PreviewFormMetaData;