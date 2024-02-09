import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  INDENT_CONTENT_COMMAND,
  RangeSelection,
} from "lexical";
import { useEffect } from "react";

import { $getListDepth, $isListItemNode, $isListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function getElementNodesInSelection(selection: RangeSelection) {
  const nodesInSelection = selection.getNodes();

  if (nodesInSelection.length === 0) {
    return new Set([
      selection.anchor.getNode().getParentOrThrow(),
      selection.focus.getNode().getParentOrThrow(),
    ]);
  }

  return new Set(
    nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow())),
  );
}

function isIndentPermitted(maxDepth: number) {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return false;
  }

  const elementNodesInSelection = getElementNodesInSelection(selection);

  let totalDepth = 0;

  const elementNodesArray = Array.from(elementNodesInSelection);
  for (const elementNode of elementNodesArray) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent();
      if (!$isListNode(parent)) {
        throw new Error(
          "ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.",
        );
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
    }
  }

  return totalDepth <= maxDepth;
}

export interface IEditorListMaxIndentLevelPluginProps {
  maxDepth?: number;
}

export const EditorListMaxIndentLevelPlugin: React.FC<
  IEditorListMaxIndentLevelPluginProps
> = ({ maxDepth }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? 7),
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor, maxDepth]);

  return null;
};
