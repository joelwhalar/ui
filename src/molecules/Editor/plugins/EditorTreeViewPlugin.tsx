import { Box, useMultiStyleConfig } from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export const EditorTreeViewPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const style = useMultiStyleConfig("Editor");
  return (
    <Box sx={{ [".tree-view-output"]: style.debugger }}>
      <TreeView
        timeTravelPanelClassName="debug-timetravel-panel"
        timeTravelButtonClassName="debug-timetravel-button"
        timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
        timeTravelPanelButtonClassName="debug-timetravel-panel-button"
        editor={editor}
        treeTypeButtonClassName={""}
        viewClassName={"tree-view-output"}
      />
    </Box>
  );
};
