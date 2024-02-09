import {
  ChakraProvider,
  ThemeOverride,
  mergeThemeOverride,
} from "@chakra-ui/react";

import { theme } from "./theme";

export interface ICustomThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeOverride;
}

export const ThemeProvider: React.FC<ICustomThemeProviderProps> = ({
  children,
  theme: customTheme = {},
}) => {
  const custom = mergeThemeOverride(theme, customTheme);
  return <ChakraProvider theme={custom}>{children}</ChakraProvider>;
};
