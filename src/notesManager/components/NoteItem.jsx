import { convertFromRaw } from 'draft-js'
import React from 'react'
import NoteTag from './NoteTag'
import NoteMenu from './NoteMenu';

function NoteItem({ id, title, tags, content, createdAt }) {
  const tagsList = tags ? tags.map(tag => <NoteTag key={tag} tag={tag}/>) : null;
  const catDate = new Date(createdAt);
  return (
    <div className="flex flex-col justify-between rounded-md border-2 p-3">
      <div className="flex flex-col">
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <p className="mb-1 text-xs text-slate-400">{catDate.toDateString()}</p>
            <p className="mb-3 text-lg font-semibold text-slate-800">{title}</p>
          </div>
          <NoteMenu noteId={id} title={title} tags={tags} content={content}/>
        </div>
        <p className="mb-3 border-l p-2 text-slate-600">{convertFromRaw(content).getPlainText()}</p>
      </div>
      <div className="mt-2 flex gap-1">{tagsList}</div>
    </div>
  )
}

export default NoteItem