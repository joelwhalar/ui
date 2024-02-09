import { ThemeOverride, extendBaseTheme } from "@chakra-ui/react";
import { EditorTheme } from "@molecules/Editor";

import { breakpoints, colors, fontSizes, fonts, shadows } from "./foundations";
import { lineHeights } from "./foundations/lineHeights";

export const themeOverrides: ThemeOverride = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  breakpoints,
  colors,
  fonts,
  fontSizes,
  shadows,
  components: {
    Editor: EditorTheme,
  },
  lineHeights,
};

export const theme: ThemeOverride = extendBaseTheme(themeOverrides);
