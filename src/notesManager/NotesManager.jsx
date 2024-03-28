import { Editor, EditorState } from 'draft-js'
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';

function NotesManager() {
  const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty());
  return (
    <>
      <Editor editorState={editorState} onChange={setEditorState}/>
    </>
  )
}

export default NotesManager