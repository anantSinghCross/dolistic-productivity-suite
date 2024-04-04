import { convertFromRaw } from 'draft-js'
import React from 'react'
import NoteTag from './NoteTag'

function NoteItem({ title, tags, content, createdAt }) {
  const tagsList = tags ? tags.map(tag => <NoteTag key={tag} tag={tag}/>) : null;
  const catDate = new Date(createdAt);
  return (
    <div className='flex flex-col justify-between p-3 border-2 rounded-md'>
      <div className='flex flex-col'>
        <p className='text-xs text-slate-400 mb-1'>{catDate.toDateString()}</p>
        <p className='mb-3 text-lg font-semibold text-slate-800'>{title}</p>
        <p className='mb-3 p-2 text-slate-600 border-l'>{convertFromRaw(content).getPlainText()}</p>
      </div>
      <div className='flex gap-1 mt-2'>{tagsList}</div>
    </div>
  )
}

export default NoteItem