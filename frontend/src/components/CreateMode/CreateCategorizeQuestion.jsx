import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext'
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';

function CreateCategorizeQuestion({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } =currentPath=="/createform"?useContext(CreateFormContext):useContext(EditFormContext)

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
        <div className="flex flex-col gap-5">
            <div>
                <div className='flex items-center justify-between mb-2 w-full max-w-[360px]'>
                    <h4>Categories</h4>
                    <button
                        className="text-white bg-[#4299E1] hover:bg-[#3182CE] rounded px-2 py-1"
                        onClick={() => handleAddCategory(questionIndex)}
                    >
                        Add New Category
                    </button>
                </div>

                <div className='flex flex-col gap-1'>
                    {question.categorize.categories.map((category, categoryIndex) => (
                        <div  key={categoryIndex} className='flex gap-2 items-center'>
                         <input
                            type="text"
                            className='w-[90%] max-w-[440px]'
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
                        <span className='w-4 h-4 rounded-full flex justify-center items-center text-2xl cursor-pointer shadow-[0_0_3px_gray]' onClick={()=>handledeleteCategory(questionIndex,categoryIndex)}>-</span>
                        </div>
                    ))}

                </div>
            </div>

            <div>
                <div className='flex items-center justify-between mb-2 w-full max-w-[360px]'>
                    <h4>Items</h4>
                    <button
                        className="text-white bg-[#4299E1] hover:bg-[#3182CE] rounded px-2 py-1"
                        onClick={() => handleAddItem(questionIndex)}
                    >
                        Add New Item
                    </button>
                </div>
                <div className='flex flex-col gap-1'>
                {question.categorize.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2 items-center">
                        <input
                            type="text"
                            className='!w-[48%] mr-[1%] inline-block'
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
                        className='!w-[48%] inline-block p-2 rounded border border-[#ccc]'
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
                        <span className='w-4 h-4 rounded-full flex justify-center items-center text-2xl cursor-pointer shadow-[0_0_3px_gray]' onClick={()=>handledeleteItem(questionIndex,itemIndex)}>-</span>

                    </div>
                ))}
                </div>
              
            </div>
        </div>
    )
}

export default CreateCategorizeQuestion