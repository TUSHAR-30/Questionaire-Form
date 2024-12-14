import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext'

function CategorizeQuestion({ question, questionIndex }) {
    const { questions, setQuestions } = useContext(CreateFormContext)

    const handleAddCategory = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categories.push('');
        setQuestions(newQuestions);
    };

    const handleCategoryChange = (questionIndex, categoryIndex, newCategory) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categories[categoryIndex] = newCategory;
        setQuestions(newQuestions);
    };

    const handleAddItem = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].items.push({ name: '', category: '' });
        setQuestions(newQuestions);
    };

    const handleItemNameChange = (questionIndex, itemIndex, newName) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].items[itemIndex].name = newName;
        setQuestions(newQuestions);
    };

    const handleItemCategoryChange = (questionIndex, itemIndex, newCategory) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].items[itemIndex].category = newCategory;
        setQuestions(newQuestions);
    };

    return (
        <div className="question-categorize">
            <div className="category-container">
                <h4>Categories</h4>
                {question.categories.map((category, categoryIndex) => (
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
                <button
                    className="add-category-btn"
                    onClick={() => handleAddCategory(questionIndex)}
                >
                    Add Category
                </button>
            </div>

            <div className="items-container">
                <h5>Items</h5>
                {question.items.map((item, itemIndex) => (
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
                            {question.categories.map((category, categoryIndex) => (
                                <option key={categoryIndex} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    className="add-item-btn"
                    onClick={() => handleAddItem(questionIndex)}
                >
                    Add Item
                </button>
            </div>
        </div>
    )
}

export default CategorizeQuestion