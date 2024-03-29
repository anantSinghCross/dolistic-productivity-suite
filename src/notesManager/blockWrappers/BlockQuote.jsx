import React from 'react'

function BlockQuote({ children }) {
  return (
    <div className=' mt-2 mb-2 p-3 border-l-4 border-slate-200 bg-slate-50 text-base text-slate-500 font-normal'>
      { children }
    </div>
  )
}

export default BlockQuote