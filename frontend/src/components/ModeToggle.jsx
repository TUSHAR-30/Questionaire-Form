import React from 'react'

function ModeToggle({ isPreview, handleMode }) {

  return (
    <div className='createAndPreview-Toggle'>
      <button className={`${isPreview ? "" : "active"}`} onClick={() => handleMode(false)}>Create</button>
      <button className={`${isPreview ? "active" : ""}`} onClick={() => handleMode(true)}>Preview</button>
    </div>
  )
}

export default ModeToggle