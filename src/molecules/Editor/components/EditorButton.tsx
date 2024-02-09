import {
  IconButton,
  IconButtonProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";

export const EditorButton: React.FC<IconButtonProps> = (props) => {
  const styles = useMultiStyleConfig("Editor");
  return <IconButton variant="tertiary" __css={styles.button} {...props} />;
};
