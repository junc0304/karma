import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class TextEditor extends React.Component {

    onChange = editorState => {
        this.setState({
            editorState
        });
    };

    focus = () => this.refs.editor.focus();

    handleKeyCommand = command => {
        const { editorState } = this.props;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };

    onTab = e => {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
    };
    toggleBlockType = blockType => {
        this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
    };
    toggleInlineStyle = inlineStyle => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
        );
    };
    render() {
        const { editorState } = this.props;
        let className = 'RichEditor-editor';
        let style = { 
            borderTop: "1px solid #ddd",
            cursor: "text",
            fontSize: "16px",
            marginTop: "10px" }

        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
                style = {  display: "none"}
            }
        }
        return (
            <div className="RichEditor-root" 
                style={{ 
                    background: "#fff",  
                    border: "1px solid #ddd", 
                    fontFamily: 'Georgia, serif', 
                    fontSize: '14px', 
                    padding: '10px'}} >
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType} />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle} />
                <div className={className} onClick={this.focus} style={style}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder="Content"
                        ref="editor"
                        spellCheck={true} />
                </div>
            </div>
        );
    }
}
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = e => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'btn btn-light RichEditor-styleButton';
        let style={ fontSize: "12px", color: "#999"}
        let type = "btn btn-secondary";
        if (this.props.active) {
            className += ' RichEditor-activeButton';
            style={ fontSize: "12px", color: "white", backgroundColor: "#6c757d"}
        }
        return (
            <button className={className} type={type} onMouseDown={this.onToggle} style={style} >
                {this.props.label}
            </button>
        );
    }
}
const BLOCK_TYPES_GROUP1 = [
    { label: 'H1', style: 'header-one' },{ label: 'H2', style: 'header-two' },{ label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },{ label: 'H5', style: 'header-five' },{ label: 'H6', style: 'header-six' }];
const BLOCK_TYPES_GROUP2 = [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
];
const BlockStyleControls = props => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="btn-toolbar RichEditor-controls" role="toolbar" > 
            <div className="btn-group btn-group-sm" role="group" aria-label="text-size-mod" style={{marginRight:"3px", marginBottom:"5px"}} >
                {
                    BLOCK_TYPES_GROUP1.map(type =>
                    <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    /> )
                }
            </div>
            <div className="btn-group btn-group-sm" role="group" aria-label="list-mod" style={{marginBottom:"5px"}} >
                {
                    BLOCK_TYPES_GROUP2.map(type =>
                    <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    /> )
                }
            </div>

        </div>
    );
};
var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = props => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="btn-toolbar RichEditor-controls" role="toolbar" > 
            <div className="btn-group btn-group-sm mr-2" role="group" aria-label="text-mod" style={{marginBottom:"5px"}} >
                { INLINE_STYLES.map(type =>
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />) }
            </div>
        </div>
    );
};
