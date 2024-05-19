import React, { useState } from 'react'
import AddGoal from './components/AddGoal'
import GoalItem from './components/GoalItem'
import { useSelector } from 'react-redux'

function GoalsTracker() {
  const [showWarning, setShowWarning] = useState(true);
  const goals = useSelector(state => state.goals);
  const goalsList = goals.map(item => {
    return <GoalItem key={item.id} goal={item} />
  })
  return (
    <>
    {
      showWarning && (
        <div className='flex w-full text-center items-center justify-between p-5 bg-gradient-to-tr to-red-200 from-orange-100 shadow-inner'>
          <div>This section is a work in progress ⚒️</div>
          <button className='p-2 px-3 rounded-md shadow text-gray-500 bg-orange-50' onClick={() => setShowWarning(false)}>Got it</button>
        </div>
      )
    }
      <AddGoal/>
      {goalsList}
    </>
  )
}

export default GoalsTracker