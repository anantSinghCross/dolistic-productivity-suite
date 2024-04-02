import { Editor, EditorState, RichUtils } from 'draft-js'
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';
import CustomEditor from './components/CustomEditor';

// TODO:
// 1. Make Custom editor into AddNote and add Title and Tags
// 2. Select state from redux store and then use it in Tags Title and Custom editor

// 3. Try to use raw JSON as prop and then initialize editorState using props (create a reusable custom editor)

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
      <p>New Note ✨</p>
      <CustomEditor/>
    </div>
  )
}

export default NotesManager