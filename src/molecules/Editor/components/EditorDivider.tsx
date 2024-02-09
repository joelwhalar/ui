import { Box, useMultiStyleConfig } from '@chakra-ui/react';

export const EditorDivider: React.FC = () => {
  const styles = useMultiStyleConfig('Editor');
  return <Box __css={styles.divider} />;
};
