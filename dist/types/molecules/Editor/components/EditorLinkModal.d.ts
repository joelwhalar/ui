/// <reference types="react" />
import { EDITOR_LINK_TARGET } from "../Editor.constants";
export interface IEditorLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (url: string, text: string, target: EDITOR_LINK_TARGET) => void;
}
export declare const EditorLinkModal: React.FC<IEditorLinkModalProps>;
