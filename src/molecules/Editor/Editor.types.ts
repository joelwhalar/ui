import {
  EditorThemeClasses,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  TextNode,
} from 'lexical';

import { EDITOR_VARIANT } from './Editor.constants';

export type NodeSerializerType = (
  node: ElementNode | TextNode | LexicalNode
) => string;

export interface IEditorProps {
  debug?: boolean;
  initialValue?: string;
  minHeight?: number | string;
  namespace?: string;
  onChange?: (html: string, editor: LexicalEditor) => void;
  onError?: EditorHandleErrorType;
  placeholder?: string;
  theme?: EditorThemeClasses;
  variant?: EDITOR_VARIANT[keyof EDITOR_VARIANT];
}

export type EditorHandleErrorType = (
  error: Error,
  editor: LexicalEditor
) => void;

export type Writeable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P];
};
