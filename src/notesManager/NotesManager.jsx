import { Editor, EditorState, RichUtils } from 'draft-js'
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';
import AddNote from './components/AddNote';

// TODO:
// 1. Make note-slice and handle saving of note. Keep track of createdAt, updatedAt timestamps.
// 2. Implement editing of notes
// 3. Add searching, sorting and filtering of notes according to the behance website UI

// 10. Try to use raw JSON as prop and then initialize editorState using props (create a reusable custom editor)

function NotesManager() {
  const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty());
  
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  return (
    <div className=' mr-2 ml-2 p-2 rounded-lg border-2'>
      <AddNote/>
    </div>
  )
}

export default NotesManager