/// <reference types="react" />
import { EDITOR_VARIANT } from '../Editor.constants';
export interface IEditorToolbarProps {
    variant?: EDITOR_VARIANT[keyof EDITOR_VARIANT];
}
export declare const EditorToolbar: React.FC<IEditorToolbarProps>;
