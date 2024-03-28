import { Editor, EditorState } from 'draft-js'
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';

function NotesManager() {
  const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty());
  return (
    <div className=' mr-2 ml-2 p-2 rounded-lg border-2'>
      <p>Under Development ⚒️</p>
      <Editor editorState={editorState} onChange={setEditorState}/>
    </div>
  )
}

export default NotesManager