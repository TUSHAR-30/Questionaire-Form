import React from 'react'

function CategorizeQuestionPreview({ question }) {
    return (
        <div className='categorize-container-Preview'>
            <div className='category-container-Preview'>
                {question.categorize.categories.map((category, index) => (
                    category.trim() && <div key={index} className='category-Preview'>
                        <div className='category-header-Preview'>{category}</div>
                        <div className='category-item-Preview'></div>
                    </div>
                ))}
            </div>
            <div className='item-container-Preview'>
                {question.categorize.items.map((item, index) => (
                    item.name.trim() && <div key={index} className='item-Preview'>{item.name}</div>
                ))}
            </div>

        </div>
    )
}

export default CategorizeQuestionPreview