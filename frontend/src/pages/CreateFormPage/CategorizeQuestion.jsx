import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext'
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';

function CategorizeQuestion({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } =currentPath=="/dragforms/createform"?useContext(CreateFormContext):useContext(EditFormContext)

    const handleAddCategory = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.categories.push('');
        setQuestions(newQuestions);
    };

    const handledeleteCategory=(questionIndex, categoryIndex)=>{
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.categories=newQuestions[questionIndex].categorize.categories.filter((category,index)=>index!=categoryIndex)
        setQuestions(newQuestions);
    }

    const handledeleteItem=(questionIndex,itemIndex)=>{
        const newQuestions = [...questions];
        newQuestions[questionIndex].categorize.items=newQuestions[questionIndex].categorize.items.filter((item,index)=>index!=itemIndex)
        setQuestions(newQuestions);
    }

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
                        <div  key={categoryIndex} className='input-category'>
                         <input
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
                        <span className='deleteItembtn' onClick={()=>handledeleteCategory(questionIndex,categoryIndex)}>-</span>
                        </div>
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
                <div className='input-category-container'>
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
                                category.trim() && <option key={categoryIndex} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <span className='deleteItembtn' onClick={()=>handledeleteItem(questionIndex,itemIndex)}>-</span>

                    </div>
                ))}
                </div>
              
            </div>
        </div>
    )
}

export default CategorizeQuestion