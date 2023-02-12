import { useState, useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { BsListUl, BsTypeItalic } from "react-icons/bs";

import {AiOutlineOrderedList } from "react-icons/ai"; 
import {GrUnderline } from "react-icons/gr";
import { BiBold } from "react-icons/bi";
import { stateFromHTML } from "draft-js-import-html";




const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const BLOCK_TYPES = [
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" }
];

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
];

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const StyleButton = ({ onToggle, style, active, label }) => {
  const onButtonToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = "  ml-2 hover:cursor-pointer";
  if (active) className += " ml-2 hover:cursor-pointer bg-stone-500 text-white";

  return (
    <div className={className} onMouseDown={onButtonToggle}>
        {
            label==="OL"?<AiOutlineOrderedList className="text-2xl "/>:""
        }
        {    label==="UL"?<BsListUl className="text-2xl"/>:""
        }
        {    label==="Bold"?<BiBold className="text-2xl"/>:""
        }
        {    label==="Italic"?<BsTypeItalic className="text-2xl"/>:""
        }
        {    label==="Underline"?<GrUnderline className="text-2xl"/>:""
        }
    </div>
  );
};

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="flex select-none font-serif">
      {BLOCK_TYPES.map(({ style, label }, index) => (
        <StyleButton
          key={index}
          active={style === blockType}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </div>
  );
};

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="flex select-none font-serif">
      {INLINE_STYLES.map(({ style, label }, index) => (
        <StyleButton
          key={index}
          active={currentStyle.has(style)}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </div>
  );
};

// comeponent editor
export default function RichEditor({defaultDesc,setTextHtml}) {
  const [editorState, setEditorState] = useState(
    defaultDesc?EditorState.createWithContent(stateFromHTML(defaultDesc)):EditorState.createEmpty()
  );
  const editor = useRef(null);

  const focus = () => editor.current?.focus();
  const onChange = (editorState) => {setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    } else return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      // TAB
      const newState = RichUtils.onTab(e, editorState, 4);
      if (newState !== editorState) onChange(newState);
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = "RichEditor-editor";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }
  
  useEffect(() => {
    setTextHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))

  }, [editorState])
  

  return (
    <div className=" shadow p-[15px] bg-white font-serif  text-[14px] rounded-md">
      <div className="flex flex-row">
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      </div>

      <div className={className} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          ref={editor}
          spellCheck
        />
      </div>

    </div>
  );
}

