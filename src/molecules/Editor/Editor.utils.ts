import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  ElementNode,
  LexicalEditor,
  RangeSelection,
  TextFormatType,
  TextNode,
} from 'lexical';

import { Placement, computePosition } from '@floating-ui/react';
import { $generateNodesFromDOM } from '@lexical/html';
import { $isAtNodeEnd } from '@lexical/selection';

import { NodeSerializerType } from './Editor.types';

export const clearTextFormatting = (editor: LexicalEditor) => {
  const format: TextFormatType[] = [
    'bold',
    'underline',
    'strikethrough',
    'italic',
    'highlight',
    'code',
    'subscript',
    'superscript',
  ];

  editor.update(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes();

      nodes.forEach((node) => {
        if ($isTextNode(node)) {
          format.forEach((format) => {
            if (node.hasFormat(format)) {
              node.toggleFormat(format);
            }
          });
        }
      });
    }
  });
};

export const serializeNodeToHTML: NodeSerializerType = (node) => {
  let html = '';

  if (node instanceof TextNode) {
    let text = node.getTextContent();
    if (node.hasFormat('bold')) {
      text = `<strong>${text}</strong>`;
    }
    if (node.hasFormat('italic')) {
      text = `<em>${text}</em>`;
    }
    html += text;
  } else if (node instanceof ElementNode) {
    const childrenHTML = node.getChildren().map(serializeNodeToHTML).join('');
    const tag = node.getType();
    html += `<${tag}>${childrenHTML}</${tag}>`;
  }

  return html;
};

export const getSelectedNode = (selection: RangeSelection) => {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();

  if (anchorNode === focusNode) {
    return anchorNode;
  }

  const isBackward = selection.isBackward();

  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
};

export const positionEditorElement = (
  domRange: Range | null,
  editor: HTMLElement,
  placement: Placement = 'top-start'
) => {
  if (domRange === null) {
    editor.removeAttribute('style');
    editor.removeAttribute('data-placement');
  } else {
    computePosition(domRange, editor, {
      placement,
    }).then(({ x, y }) => {
      editor.dataset.placement = placement;
      editor.style.left = `${x}px`;
      editor.style.opacity = '1';
      editor.style.top = `${y}px`;
    });
  }
};

export const transformHTMLtoNodes = (html: string, editor: LexicalEditor) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');
  const nodes = $generateNodesFromDOM(editor, dom);
  return nodes;
};
