import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext'

function CategorizeQuestion({ question, questionIndex }) {
    const { questions, setQuestions } = useContext(CreateFormContext)

    const handleAddCategory = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.categories.push('');
        setQuestions(newQuestions);
    };

    const handleCategoryChange = (questionIndex, categoryIndex, newCategory) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.categories[categoryIndex] = newCategory;
        setQuestions(newQuestions);
    };

    const handleAddItem = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.items.push({ name: '', category: '' });
        setQuestions(newQuestions);
    };

    const handleItemNameChange = (questionIndex, itemIndex, newName) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.items[itemIndex].name = newName;
        setQuestions(newQuestions);
    };

    const handleItemCategoryChange = (questionIndex, itemIndex, newCategory) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.items[itemIndex].category = newCategory;
        setQuestions(newQuestions);
    };

    return (
        <div className="question-categorize">
            <div className="category-container">
                <div className='add-category-container'>
                    <h4>Categories</h4>
                    <button
                        className="add-category-btn"
                        onClick={() => handleAddCategory(questionIndex)}
                    >
                        Add New Category
                    </button>
                </div>

                <div className='input-category-container'>
                    {question.categorize.categories.map((category, categoryIndex) => (
                        <input
                            key={categoryIndex}
                            type="text"
                            value={category}
                            onChange={(e) =>
                                handleCategoryChange(
                                    questionIndex,
                                    categoryIndex,
                                    e.target.value
                                )
                            }
                            placeholder={`Category ${categoryIndex + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="items-container">
                <div className='add-item-container'>
                    <h4>Items</h4>
                    <button
                        className="add-item-btn"
                        onClick={() => handleAddItem(questionIndex)}
                    >
                        Add New Item
                    </button>
                </div>
                {question.categorize.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="item-input">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                                handleItemNameChange(
                                    questionIndex,
                                    itemIndex,
                                    e.target.value
                                )
                            }
                            placeholder={`Item ${itemIndex + 1}`}
                        />
                        <select
                            value={item.category}
                            onChange={(e) =>
                                handleItemCategoryChange(
                                    questionIndex,
                                    itemIndex,
                                    e.target.value
                                )
                            }
                        >
                            <option value="">Select Category</option>
                            {question.categorize.categories.map((category, categoryIndex) => (
                                <option key={categoryIndex} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorizeQuestion