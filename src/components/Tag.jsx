import React from 'react'

function Tag({name}) {
  return (
    <span className='rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-500'>{name}</span>
  )
}

export default Tag