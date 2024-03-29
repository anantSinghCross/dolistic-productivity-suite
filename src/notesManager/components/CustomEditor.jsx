import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from "draft-js";
import React, { useState } from "react";
import { BiBold, BiItalic, BiUnderline, BiCodeAlt } from "react-icons/bi";
import ControlButton from "./ControlButton";
import "draft-js/dist/Draft.css";
import { blockRenderMap } from "../blockWrappers/blockRenderMap";

function CustomEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onBoldClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  const onItalicsClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  const onUndlerlineClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  const onCodeClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  const onH1Click = () => setEditorState(RichUtils.toggleBlockType(editorState, "custom-h1"));

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

  return (
    <div className=" m-2 mt-3">
      <div className="flex gap-1 items-center flex-wrap mt-2 mb-2">
        <ControlButton onClick={onBoldClick} name={<BiBold/>}/>
        <ControlButton onClick={onItalicsClick} name={<BiItalic/>}/>
        <ControlButton onClick={onUndlerlineClick} name={<BiUnderline/>}/>
        <ControlButton onClick={onCodeClick} name={<BiCodeAlt/>}/>
        |
        <ControlButton onClick={onH1Click} name={'H1'}/>

      </div>
      <div className=" rounded border p-2">
        <Editor
          blockRenderMap={extendedBlockRenderMap}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
}

export default CustomEditor;
