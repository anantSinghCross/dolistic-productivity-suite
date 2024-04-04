import React from 'react'

function NoteTag({ tag }) {
  return (
    <div className='rounded bg-indigo-100 px-2 text-sm text-indigo-700'>{tag}</div>
  )
}

export default NoteTag