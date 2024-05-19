import React from 'react'
import AddGoal from './components/AddGoal'
import GoalItem from './components/GoalItem'
import { useSelector } from 'react-redux'

function GoalsTracker() {
  const goals = useSelector(state => state.goals);
  const goalsList = goals.map(item => {
    return <GoalItem key={item.id} />
  })
  return (
    <>
      <div className='w-full text-center p-5 bg-gradient-to-tr to-red-200 from-orange-100 shadow-inner'>Work in Progress ⚒️</div>
      <AddGoal/>
      {goalsList}
    </>
  )
}

export default GoalsTracker