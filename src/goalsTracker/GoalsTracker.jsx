import React, { useEffect, useState } from 'react'
import AddGoal from './components/AddGoal'
import GoalItem from './components/GoalItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoals } from '../store/goals-slice';

// Todo: 🔳C ✅R 🔳U 🔳D

function GoalsTracker() {
  const dispatch = useDispatch();
  const uid = useSelector(s => s.auth);
  const [showWarning, setShowWarning] = useState(true);
  const goals = useSelector(state => state.goals);
  const goalsList = goals.map(item => {
    return <GoalItem key={item.id} goal={item} />
  })

  useEffect(() => {
    const promise = dispatch(fetchGoals(uid));
    // return () => {
    //   promise.abort();
    // }
  }, [])
  
  return (
    <>
    {
      showWarning && (
        <div className='flex w-full items-center justify-between p-5 bg-gradient-to-tr to-red-200 from-orange-100 shadow-inner'>
          <div>This section is a work in progress ⚒️</div>
          <button className='p-2 px-3 rounded-md shadow text-gray-500 bg-orange-50 text-nowrap' onClick={() => setShowWarning(false)}>Got it</button>
        </div>
      )
    }
      <AddGoal/>
      {goalsList}
    </>
  )
}

export default GoalsTracker