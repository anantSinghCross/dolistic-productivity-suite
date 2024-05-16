import React from 'react'

function Tag({name}) {
  return (
    <span className='rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 px-2 py-1 text-xs font-medium text-indigo-500'>{name}</span>
  )
}

export default Tag