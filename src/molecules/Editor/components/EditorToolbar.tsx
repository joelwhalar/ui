import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  Box,
  Icon,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";

import { EditorButton, EditorFloatingLink, EditorLinkModal } from ".";
import {
  EDITOR_LINK_TARGET,
  EDITOR_VARIANT,
  LOW_PRIORITY,
} from "../Editor.constants";
import {
  clearTextFormatting,
  getSelectedNode,
  transformHTMLtoNodes,
} from "../Editor.utils";
import { EditorDivider } from "./EditorDivider";
import { LinkIcon } from "@chakra-ui/icons";
import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiItalic,
  BiLeftIndent,
  BiListOl,
  BiListUl,
  BiRightIndent,
  BiText,
} from "react-icons/bi";

export interface IEditorToolbarProps {
  variant?: EDITOR_VARIANT[keyof EDITOR_VARIANT];
}

export const EditorToolbar: React.FC<IEditorToolbarProps> = ({
  variant = EDITOR_VARIANT.default,
}) => {
  const [blockType, setBlockType] = useState("paragraph");
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const styles = useMultiStyleConfig("Editor", {});
  const toolbarRef = useRef(null);

  const {
    isOpen: isLinkModalOpen,
    onClose: onLinkModalClose,
    onOpen: onLinkModalOpen,
  } = useDisclosure();

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          updateToolbar();
          return false;
        },
        LOW_PRIORITY,
      ),
    );
  }, [editor, updateToolbar]);

  const insertLink = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const isRangeSelection = $isRangeSelection(selection);

      if (isRangeSelection && !selection?.isCollapsed()) {
        if (!isLink) {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
        } else {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
      } else {
        onLinkModalOpen();
      }
    });
  }, [editor, isLink]);

  const handleLinkInsert = (
    url: string,
    text: string,
    target: EDITOR_LINK_TARGET,
  ) => {
    editor.update(() => {
      const nodes = transformHTMLtoNodes(
        `<a href="${url}" target="${target}">${text}</a>`,
        editor,
      );
      $insertNodes(nodes);
    });
  };

  if (variant === EDITOR_VARIANT.link) {
    return (
      <Box __css={styles.toolbar} ref={toolbarRef}>
        <EditorButton
          aria-label="Insert Link"
          isActive={isLink}
          icon={<LinkIcon boxSize={4} />}
          onClick={insertLink}
        />
        {isLink &&
          createPortal(<EditorFloatingLink editor={editor} />, document.body)}
        <EditorLinkModal
          isOpen={isLinkModalOpen}
          onClose={onLinkModalClose}
          onSave={handleLinkInsert}
        />
      </Box>
    );
  }

  if (variant === EDITOR_VARIANT.advanced) {
    return (
      <Box __css={styles.toolbar} ref={toolbarRef}>
        <EditorButton
          aria-label="Insert Link"
          isActive={isLink}
          icon={<LinkIcon boxSize={4} />}
          onClick={insertLink}
        />
        {isLink &&
          createPortal(<EditorFloatingLink editor={editor} />, document.body)}
        <EditorButton
          aria-label="Format Bold"
          isActive={isBold}
          icon={<Icon as={BiBold} boxSize={4} />}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        />
        <EditorButton
          aria-label="Format Italic"
          isActive={isItalic}
          icon={<Icon as={BiItalic} boxSize={4} />}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        />
        <EditorDivider />
        <EditorButton
          aria-label="Left Align"
          icon={<Icon as={BiAlignLeft} boxSize={4} />}
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        />
        <EditorButton
          aria-label="Center Align"
          icon={<Icon as={BiAlignMiddle} boxSize={4} />}
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }
        />
        <EditorButton
          aria-label="Right Align"
          icon={<Icon as={BiAlignRight} boxSize={4} />}
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }
        />
        <EditorButton
          aria-label="Justify Align"
          icon={<Icon as={BiAlignJustify} boxSize={4} />}
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
          }
        />
        <EditorDivider />
        <EditorButton
          aria-label="Format List"
          icon={<Icon as={BiListUl} boxSize={4} />}
          onClick={formatBulletList}
        />
        <EditorButton
          aria-label="Format Numbered List"
          icon={<Icon as={BiListOl} boxSize={4} />}
          onClick={formatNumberedList}
        />
        <EditorButton
          aria-label="Outdent"
          icon={<Icon as={BiLeftIndent} boxSize={4} />}
          onClick={() =>
            editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
          }
        />
        <EditorButton
          aria-label="Indent"
          icon={<Icon as={BiRightIndent} boxSize={4} />}
          onClick={() =>
            editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
          }
        />
        <EditorDivider />
        <EditorButton
          aria-label="Remove Text Formatting"
          icon={<Icon as={BiText} boxSize={4} />}
          onClick={() => clearTextFormatting(editor)}
        />

        <EditorLinkModal
          isOpen={isLinkModalOpen}
          onClose={onLinkModalClose}
          onSave={handleLinkInsert}
        />
      </Box>
    );
  }

  return (
    <Box __css={styles.toolbar} ref={toolbarRef}>
      <EditorButton
        aria-label="Insert Link"
        isActive={isLink}
        icon={<LinkIcon boxSize={4} />}
        onClick={insertLink}
      />
      {isLink &&
        createPortal(<EditorFloatingLink editor={editor} />, document.body)}
      <EditorButton
        aria-label="Format Bold"
        isActive={isBold}
        icon={<Icon as={BiBold} boxSize={4} />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      />
      <EditorButton
        aria-label="Format Italic"
        isActive={isItalic}
        icon={<Icon as={BiItalic} boxSize={4} />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      />
      <EditorDivider />
      <EditorButton
        aria-label="Remove Text Formatting"
        icon={<Icon as={BiText} boxSize={4} />}
        onClick={() => clearTextFormatting(editor)}
      />

      <EditorLinkModal
        isOpen={isLinkModalOpen}
        onClose={onLinkModalClose}
        onSave={handleLinkInsert}
      />
    </Box>
  );
};
