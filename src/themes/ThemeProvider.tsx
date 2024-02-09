import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";

export interface ICustomThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ICustomThemeProviderProps> = ({
  children,
}) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;
