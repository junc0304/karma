import React, { useRef, useState, useEffect, memo } from 'react';
import { Editor, RichUtils } from 'draft-js';
import { FontIcon, ItalicTextIcon, BoldTextIcon, UnderlineTextIcon, OrderedListIcon, UnorderedListIcon } from '../icons';
import _ from 'lodash';
import { convertText } from '../../helpers';

const maxDepth = 4;
const RichTextEditor = memo(({ edit, defaultValue, onChange }) => {
  const [className, setClassName] = useState('RichEditor-editor');
  const [editorState, setEditorState] = useState(convertText.toEditorState(defaultValue));

  useEffect(() => {
    setEditorState(convertText.toEditorState(defaultValue));
  }, [defaultValue, edit]);

  useEffect(() => {
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() === "unstyled") {
        setClassName(className + ' RichEditor-hidePlaceholder');
      }
    }
  }, [editorState]);

  const editor = useRef();
  const debouncedOnChange = _.debounce((editorState) => onChange(convertText.toRaw(editorState)), 100);
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

const StyleButton = memo(({ style, active, label, onToggle }) => {
  const [className, setClassName] = useState('RichEditor-styleButton');

  // eslint-disable-next-line
  useEffect(() => setClassName(className + ' RichEditor-activeButton'), []);

  const onMouseDown = (event) => {
    event.preventDefault();
    onToggle(style);
  }

  return (
    <span
      size="sm"
      variant="light"
      className={className}
      onMouseDown={onMouseDown}
      style={{
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
  { label: <FontIcon style={{ fontSize: "2em" }} />, style: 'header-one' },
  { label: <FontIcon style={{ fontSize: "1.7em" }} />, style: 'header-two' },
  { label: <FontIcon style={{ fontSize: "1.5em" }} />, style: 'header-three' },
  { label: <FontIcon style={{ fontSize: "1.2em" }} />, style: 'header-four' },
  { label: <FontIcon style={{ fontSize: "1.0em" }} />, style: 'header-five' },
  { label: <FontIcon style={{ fontSize: "0.9em" }} />, style: 'header-six' },
  { label: <UnorderedListIcon style={{ fontSize: "1.7em" }} />, style: 'unordered-list-item' },
  { label: <OrderedListIcon style={{ fontSize: "1.7em" }} />, style: 'ordered-list-item' }
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
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style} />)}
    </div>
  );
});

var INLINE_STYLES = [
  { label: <BoldTextIcon style={{ fontSize: "1.7em" }} />, style: 'BOLD', buttonStyle: { fontWeight: "bold" } },
  { label: <ItalicTextIcon style={{ fontSize: "1.7em" }} />, style: 'ITALIC', buttonStyle: { fontStyle: "italic" } },
  { label: <UnderlineTextIcon style={{ fontSize: "1.7em" }} />, style: 'UNDERLINE', buttonStyle: { textDecoration: "underline" } },
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
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style} />)}
    </div>
  );
});

export default RichTextEditor;