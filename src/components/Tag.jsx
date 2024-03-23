import React from 'react'

function Tag({name}) {
  return (
    <span className='rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-400'>{name}</span>
  )
}

export default Tag