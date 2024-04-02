import React from 'react'
import { useSelector } from 'react-redux'
import CustomEditor from './CustomEditor';

function AddNote() {
  const draftNote = useSelector(state => state.draftNote);
  return (
    <div>
      <input type="text" />
      <CustomEditor/>
      <input type="text" />
    </div>
  )
}

export default AddNote