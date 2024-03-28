import React from 'react'

// Todo: Add Notes and Tasks NavLinks here

function Header() {
  return (
    <nav className='flex justify-between items-center p-4 bg-white'>
      <h1 className='text-lg font-medium'>DoListic 📝</h1>
      <menu className='flex'>
        <li><button className=' px-3 py-2 border-b-transparent border-b-4 hover:border-b-4 hover:border-solid hover:border-indigo-400'>Notes</button></li>
      </menu>
    </nav>
  )
}

export default Header