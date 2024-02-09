import { LexicalEditor } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { EditorComponent } from "./Editor.component";
import { EDITOR_DETAULT_CONFIG } from "./Editor.constants";
import { defaultTheme } from "./Editor.theme";
import { IEditorProps } from "./Editor.types";

export const Editor: React.FC<IEditorProps> = (props) => {
  const {
    namespace = "editor",
    onError: onErrorCustom,
    theme = defaultTheme,
  } = props;

  const onError = (error: Error, editor: LexicalEditor) => {
    onErrorCustom && onErrorCustom(error, editor);
    throw error;
  };

  return (
    <LexicalComposer
      initialConfig={{ ...EDITOR_DETAULT_CONFIG, onError, theme, namespace }}
    >
      <EditorComponent {...props} />
    </LexicalComposer>
  );
};
