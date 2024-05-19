import React from 'react'

function GoalItem() {
  return (
    <div className="flex flex-col p-2 border">
      <div className=" mb-2 flex items-center w-full gap-2">
        <div className="rounded-md h-5 w-full shadow-inner bg-gray-50">
          <div className="rounded-md h-5 w-[80%] bg-gradient-to-t from-green-300 to-teal-400 shadow-md shadow-teal-100"></div>
        </div>
        <span className="w-max text-lg font-bold text-transparent bg-gradient-to-t from-green-300 to-teal-400 bg-clip-text">
          80%
        </span>
      </div>
    </div>
  )
}

export default GoalItem