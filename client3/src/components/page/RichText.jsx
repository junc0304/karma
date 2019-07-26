import React, { useRef, useState, useEffect, memo } from 'react';
import { Editor, RichUtils } from 'draft-js';
import _ from 'lodash';

const maxDepth = 4;

const RichTextEditor = memo(({ edit, defaultValue, onChange /* editorState, onChangeEditorState  */ }) => {
  const [className, setClassName] = useState('RichEditor-editor');
  const [editorState, setEditorState] = useState(defaultValue);

  useEffect(() => {
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() === "unstyled") {
        setClassName(className + ' RichEditor-hidePlaceholder');
      }
    }
  }, [editorState]);
 

  const editor = useRef();
  const debouncedOnChange = _.debounce((editorState) => onChange(editorState), 100);
  const debouncedStateChange = _.debounce((editorState) => setEditorState(editorState), 30);
  const onChangeEditorState = (editorState) => {
    debouncedStateChange(editorState);
    debouncedOnChange(editorState);
  }
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChangeEditorState(newState);
      return true;
    }
    return false;
  }
  const onFocus = () => editor.current.focus();
  const onTab = (event) => onChangeEditorState(RichUtils.onTab(event, editorState, maxDepth));
  const toggleBlockType = (blockType) => onChangeEditorState(RichUtils.toggleBlockType(editorState, blockType));
  const toggleInlineStyle = (inlineStyle) => onChangeEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

  return (
    <div
      onClick={onFocus}
      className="RichEditor-root"
      style={{ background: "#fff", border: edit ? "1px solid #ddd" : "0px solid #ddd", fontSize: "14px", padding: "15px", minHeight: "200px", borderRadius: "5px", backgroundColor: edit ? "rgba(255, 255, 255, 0.8)" : "inherit" }}>
      {edit && (
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      )}
      {edit && (
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
      )}
      {edit && <hr className="my-6" />}
      <div className={className} >
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          onTab={onTab}
          editorState={editorState}
          onChange={onChangeEditorState}
          readOnly={!edit}
          ref={editor}
          spellCheck={true}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
});

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

const StyleButton = memo(({ style, active, label, onToggle, buttonStyle, textStyle }) => {
  useEffect(() => {
    setClassName(className + ' RichEditor-activeButton');
  }, [active]);

  const onMouseDown = (event) => {
    event.preventDefault();
    onToggle(style);
  }
  const [className, setClassName] = useState('RichEditor-styleButton');
  return (
    <span
      size="sm"
      variant="light"
      className={className}
      onMouseDown={onMouseDown}
      style={{
        ...buttonStyle,
        color: "#999",
        minHeight: "15px",
        minWidth: "15px",
        marginRight: "15px",
        lineHeight: "20px",
        padding: "2px 0",
        display: "inline-block",
      }}>
      {label}</span>
  );
});

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', buttonStyle: { fontSize: "15px" } },
  { label: 'H2', style: 'header-two', buttonStyle: { fontSize: "15px" } },
  { label: 'H3', style: 'header-three', buttonStyle: { fontSize: "15px" } },
  { label: 'H4', style: 'header-four', buttonStyle: { fontSize: "15px" } },
  { label: 'H5', style: 'header-five', buttonStyle: { fontSize: "15px" } },
  { label: 'H6', style: 'header-six', buttonStyle: { fontSize: "15px" } },
  { label: "•", style: 'unordered-list-item', buttonStyle: { fontSize: "15px" } },
  { label: '#', style: 'ordered-list-item', buttonStyle: { fontSize: "15px" } }
];
const BlockStyleControls = memo(({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls"
      style={{
        fontFamily: "Helvetica', sans-serif",
        fontSize: "14px",
        marginBottom: "5px",
        display: "flex",
        alignItems: "center"
      }} >
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          buttonStyle={type.buttonStyle} />)}
    </div>
  );
});

var INLINE_STYLES = [
  { label: 'B', style: 'BOLD', buttonStyle: { fontWeight: "bold" } },
  { label: 'I', style: 'ITALIC', buttonStyle: { fontStyle: "italic" } },
  { label: 'U', style: 'UNDERLINE', buttonStyle: { textDecoration: "underline" } },
];
const InlineStyleControls = memo(({ editorState, onToggle }) => {
  var currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls"
      style={{
        fontFamily: "Helvetica', sans-serif",
        fontSize: "14px",
        marginBottom: "5px",
        display: "flex",
        alignItems: "center"
      }} >
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          buttonStyle={type.buttonStyle}
          style={type.style} />)}
    </div>
  );
});




export default RichTextEditor;