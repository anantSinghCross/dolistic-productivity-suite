import React from 'react'

function Header() {
  return (
    <nav className='flex justify-between items-center p-4 bg-white'>
      <h1 className=' text-lg'>DoListic 📝</h1>
      <menu className='flex'>
        <li><button className=' px-3 py-2 rounded border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700'>Notes</button></li>
      </menu>
    </nav>
  )
}

export default Header