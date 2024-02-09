import { ElementNode, LexicalEditor, RangeSelection, TextNode } from 'lexical';
import { Placement } from '@floating-ui/react';
import { NodeSerializerType } from './Editor.types';
export declare const clearTextFormatting: (editor: LexicalEditor) => void;
export declare const serializeNodeToHTML: NodeSerializerType;
export declare const getSelectedNode: (selection: RangeSelection) => ElementNode | TextNode;
export declare const positionEditorElement: (domRange: Range | null, editor: HTMLElement, placement?: Placement) => void;
export declare const transformHTMLtoNodes: (html: string, editor: LexicalEditor) => import("lexical").LexicalNode[];
