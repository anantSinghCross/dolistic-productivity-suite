import React from 'react'
import { BiTrash } from 'react-icons/bi'

function ChecklistItem({text, handleDelete}) {
  return (
    <div className='group flex items-center justify-between p-1 pl-2 ml-2 hover:bg-gray-50 rounded-lg'>
      <div className='flex gap-2'>
        <input className='mt-1 h-5 w-5 flex-shrink-0 self-start text-indigo-500' type="checkbox" disabled={true}/>
        <p>{text}</p>
      </div>
      <button 
        className='group-hover:visible invisible p-2 text-gray-400 bg-white border rounded shadow-sm'
        onClick={handleDelete}
      ><BiTrash/></button>

    </div>
  )
}

export default ChecklistItem