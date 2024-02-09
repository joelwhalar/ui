import { ChakraProvider, ThemeOverride, extendTheme } from "@chakra-ui/react";

import { theme } from "./theme";

export interface ICustomThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeOverride;
}

export const ThemeProvider: React.FC<ICustomThemeProviderProps> = ({
  children,
  theme: customTheme = {},
}) => (
  <ChakraProvider theme={extendTheme([theme, customTheme])}>
    {children}
  </ChakraProvider>
);
