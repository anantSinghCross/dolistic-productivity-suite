import { convertFromRaw } from 'draft-js'
import React from 'react'

function NoteItem({ title, tags, content }) {
  return (
    <div>
      <p>{title}</p>
      <p>{convertFromRaw(content).getPlainText()}</p>
      <p>{tags.join(', ')}</p>
    </div>
  )
}

export default NoteItem