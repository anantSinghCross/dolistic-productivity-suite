import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BiBold, BiItalic, BiUnderline, BiCodeAlt, BiSolidQuoteAltRight } from "react-icons/bi";
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw, convertFromRaw } from "draft-js";
import ControlButton from "./ControlButton";
import { blockRenderMap } from "../blockWrappers/blockRenderMap";
import { fetchDraftNote, save } from "../../store/draftNote-slice";
import "draft-js/dist/Draft.css";

function CustomEditor() {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(fetchDraftNote())
    .then((action) => {
      const content = action?.payload?.content;
      if (action.payload && content) {
        setEditorState(EditorState.createWithContent(convertFromRaw(content)));
      }
    })
  }, []);
  
  useEffect(() => {
    if(isFirstRender.current) { // because we want to prevent saving empty state to localStorage
      isFirstRender.current = false;
      return;
    }
    const content = convertToRaw(editorState.getCurrentContent());
    dispatch(save(content));
  }, [editorState])

  const onBoldClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  const onItalicsClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  const onUndlerlineClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  const onCodeClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  const onH1Click = () => setEditorState(RichUtils.toggleBlockType(editorState, "custom-h1"));
  const onH2Click = () => setEditorState(RichUtils.toggleBlockType(editorState, "custom-h2"));
  const onH3Click = () => setEditorState(RichUtils.toggleBlockType(editorState, "custom-h3"));
  const onQuoteClick = () => setEditorState(RichUtils.toggleBlockType(editorState, "custom-blockquote"));

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
        <ControlButton onClick={onH1Click} name={'H1'} className="text-xs"/>
        <ControlButton onClick={onH2Click} name={'H2'} className="text-xs"/>
        <ControlButton onClick={onH3Click} name={'H3'} className="text-xs"/>
        <ControlButton onClick={onQuoteClick} name={<BiSolidQuoteAltRight/>}/>

      </div>
      <div className=" rounded border p-2">
        <Editor
          placeholder="Start your note here... ✍️"
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
