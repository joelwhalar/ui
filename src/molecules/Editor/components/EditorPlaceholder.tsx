import { Box, useMultiStyleConfig } from "@chakra-ui/react";

export interface IEditorPlaceholderProps {
  placeholder?: string;
}

export const EditorPlaceholder: React.FC<IEditorPlaceholderProps> = ({
  placeholder = "Enter content...",
}) => {
  const styles = useMultiStyleConfig("Editor", {});
  return <Box __css={styles.placeholder}>{placeholder}</Box>;
};
