import React from 'react'

function PreviewClientResponseComprehensionQuestion({ question, questionIndex }) {
  console.log(question)
  return (
    <div className='flex flex-col gap-3'>
      <div className=' bg-gray-200 p-2 rounded-lg flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <span className='text-[14px] text-center'>Comprehension Title</span>
          <p className='h-[24px] bg-white px-1 rounded'>{question.comprehension.description.title}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-[14px] text-center'>Comprehension Content</span>
          <p className='h-[100px] overflow-y-auto bg-white px-1 rounded'>{question.comprehension.description.content}</p>
        </div>
      </div>
      <div className="bg-gray-200 p-2 rounded-lg flex flex-col gap-2">
        <span className='text-center'>Questions</span>
        {question.comprehension.questions.map((subquestion, subquestionIndex) => (
          <div key={subquestionIndex} className='rounded px-2 py-1 bg-white'>
            <span className='italic font-semibold font-sans'>Question {questionIndex + 1}.{subquestionIndex + 1}</span>
            <div>
              <p>{subquestion.question}</p>
              <div className='flex flex-col gap-1'>
                {subquestion.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`p-1 flex gap-1 rounded cursor-pointer bg-gray-200 
                    ${subquestion.selectedOption != null && optionIndex == subquestion.correctAnswer ? "bg-green-300" : ""} 
                    ${subquestion.selectedOption == optionIndex && subquestion.selectedOption != subquestion.correctAnswer ? "bg-red-300" : ""} 
                    `}>
                    <p>{option.text}</p>
                  </label>
                ))}
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default PreviewClientResponseComprehensionQuestion