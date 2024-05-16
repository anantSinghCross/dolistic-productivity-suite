import React from 'react'

function NoteTag({ tag }) {
  return (
    <div className='rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 px-2 py-1 text-xs font-medium text-indigo-500'>{tag}</div>
  )
}

export default NoteTag