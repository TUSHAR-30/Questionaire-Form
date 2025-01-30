import React from 'react'

function ModeToggle({ isPreview, handleMode }) {

  return (
    <div className='flex gap-2 mb-2 p-3 bg-zinc-100 rounded shadow-[0_0_2px_1px_#ddd] '>
      <button className={`px-2 py-1 border border-black ${isPreview ? "" : "bg-white"}`} onClick={() => handleMode(false)}>Create</button>
      <button className={`px-2 py-1 border border-black ${isPreview ? "bg-white" : ""}`} onClick={() => handleMode(true)}>Preview</button>
    </div>
  )
}

export default ModeToggle