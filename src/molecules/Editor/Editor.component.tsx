import DOMPurify from "dompurify";
import { $getRoot, $insertNodes, EditorState, LexicalEditor } from "lexical";
import { useLayoutEffect } from "react";

import { Box, useMultiStyleConfig } from "@chakra-ui/react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";

import { defaultThemeStyle } from "./Editor.theme";
import { IEditorProps } from "./Editor.types";
import { transformHTMLtoNodes } from "./Editor.utils";
import { EditorPlaceholder, EditorToolbar } from "./components";
import {
  EditorAutoLinkPlugin,
  EditorListMaxIndentLevelPlugin,
  EditorTreeViewPlugin,
} from "./plugins";

export const EditorComponent: React.FC<IEditorProps> = ({
  debug,
  initialValue,
  minHeight,
  onChange,
  placeholder,
  variant,
}) => {
  const [editor] = useLexicalComposerContext();

  const styles = useMultiStyleConfig("Editor");

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    const raw = editorState.read(() => $generateHtmlFromNodes(editor, null));
    const html = DOMPurify.sanitize(raw);
    onChange && onChange(html, editor);
  };

  useLayoutEffect(() => {
    if (!initialValue) return;

    editor.update(() => {
      const nodes = transformHTMLtoNodes(initialValue, editor);
      const root = $getRoot();
      root.clear();
      root.select();
      $insertNodes(nodes);
    });
  }, [editor]);

  return (
    <Box __css={{ ...styles.editor, ...defaultThemeStyle }}>
      <EditorToolbar variant={variant} />
      <Box __css={styles.content}>
        <RichTextPlugin
          contentEditable={
            <Box
              __css={styles.editable}
              style={{ minHeight }}
              as={ContentEditable}
            />
          }
          placeholder={<EditorPlaceholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoFocusPlugin />
        <EditorAutoLinkPlugin />
        <EditorListMaxIndentLevelPlugin maxDepth={7} />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={handleChange} />
        <TabIndentationPlugin />
        {debug && <EditorTreeViewPlugin />}
      </Box>
    </Box>
  );
};
