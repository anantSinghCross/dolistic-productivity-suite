import React, { useEffect, useState } from 'react'
import AddGoal from './components/AddGoal'
import GoalItem from './components/GoalItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoals } from '../store/goals-slice';

// Todo: ✅C ✅R ✅U 🔳D

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
      <AddGoal/>
      {goalsList}
    </>
  )
}

export default GoalsTracker