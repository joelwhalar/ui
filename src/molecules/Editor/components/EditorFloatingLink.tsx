import {
  $getSelection,
  $isRangeSelection,
  BaseSelection,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

import { Box, Icon, Input, useMultiStyleConfig } from "@chakra-ui/react";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { mergeRegister } from "@lexical/utils";

import { LOW_PRIORITY } from "../Editor.constants";
import { getSelectedNode, positionEditorElement } from "../Editor.utils";
import { EditorButton } from "./EditorButton";
import { CloseIcon } from "@chakra-ui/icons";
import { BiCheck } from "react-icons/bi";

export interface IEditorFloatingLinkProps {
  editor: LexicalEditor;
}

export const EditorFloatingLink: React.FC<IEditorFloatingLinkProps> = ({
  editor,
}) => {
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(
    null,
  );
  const [linkUrl, setLinkUrl] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);

  const styles = useMultiStyleConfig("Editor");

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      nativeSelection &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);
      if (!mouseDownRef.current) {
        positionEditorElement(domRange, editorElem);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(null, editorElem);
      setLastSelection(null);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LOW_PRIORITY,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (lastSelection !== null) {
        if (linkUrl !== "") {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
        }
      }
    }
  };

  const handleClear = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };

  const handleSave = () => {
    if (lastSelection !== null) {
      if (linkUrl !== "") {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
      }
    }
  };

  return (
    <Box ref={editorRef} __css={{ ...styles.popover, ...styles.linkPopover }}>
      <Input
        __css={styles.input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        value={linkUrl}
      />
      <EditorButton
        aria-label="Clear"
        icon={<CloseIcon boxSize={4} />}
        onClick={handleClear}
      />
      <EditorButton
        aria-label="Save"
        icon={<Icon as={BiCheck} boxSize={4} />}
        onClick={handleSave}
      />
    </Box>
  );
};
