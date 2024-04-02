import { Editor, EditorState, RichUtils } from 'draft-js'
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';
import CustomEditor from './components/CustomEditor';

// TODO:
// 0. Fix the error first
// 1. Make an AddNote component that has Tags Title and CustomEditor and set the state of the editor from props passed doen from AddNote component
// 2. Select state from redux store and then use it in Tags title and Custom editor
// 3. Do not save the tags in the draft slice

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