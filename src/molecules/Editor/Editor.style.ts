import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "button",
    "content",
    "debugger",
    "divider",
    "editable",
    "editor",
    "linkPopover",
    "placeholder",
    "popover",
    "toolbar",
  ]);


const baseStyleButton = defineStyle({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 8,
  height: 8,
  borderRadius: "md",
  color: "primary.700",
  ":hover": {
    backgroundColor: "primary.100",
  },
  ":active": {
    backgroundColor: "primary.200",
  },
  "svg": {
    color: "primary.700",
  },
});

const baseStyleContent = defineStyle({
  position: "relative",
});

const baseStyleDebugger = defineStyle({
  background: "primary.800",
  color: "white",
  display: "block",
  fontSize: "xs",
  lineHeight: "14px",
  maxHeight: "250px",
  overflow: "auto",
  padding: 4,
  position: "relative",
  whiteSpace: "pre-wrap",
});

const baseStyleDivider = defineStyle({
  position: "relative",
  width: 4,
  height: 8,
  "::before": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    width: "1px",
    height: 4,
    backgroundColor: "primary.100",
    content: '""',
  },
});

const baseStyleEditable = defineStyle({
  minHeight: "150px",
  resize: "none",
  fontSize: "md",
  position: "relative",
  tabSize: 1,
  outline: 0,
  paddingX: 4,
  "a": {
    color: "link.default",
    textDecoration: "underline",
  },
  "p": {
    marginY: 4,
  },
  "ul, ol": {
    marginLeft: 4,
  },
});

const baseStyleEditor = defineStyle({
  overflow: "hidden",
  width: "100%",
  borderColor: "primary.100",
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: "md",
  ":focus-within": {
    borderColor: "secondary.500",
  },
});

const baseStyleLinkPopover = defineStyle({
  display: "flex",
  alignItems: "center",
  paddingX: 1,
  "input": {
    flex: 1,
    height: 10,
    paddingX: 1,
    color: "primary.700",
    fontWeight: 400,
    "&:focus": {
      outline: "none",
    },
  },
});

const baseStylePlaceholder = defineStyle({
  position: "absolute",
  top: 0,
  left: 0,
  paddingX: 4,
  color: "primary.500",
  fontSize: "md",
  pointerEvents: "none",
});

const baseStylePopover = defineStyle({
  position: "absolute",
  zIndex: 100,
  top: "-10000px",
  left: "-10000px",
  maxWidth: "264px",
  height: 10,
  width: "100%",
  opacity: 0,
  marginTop: "-6px",
  backgroundColor: "white",
  boxShadow: "100",
  borderRadius: "md",
  '&[data-placement="top-start"]::before': {
    position: "absolute",
    top: "100%",
    left: 4,
    width: "0px",
    height: "0px",
    borderStyle: "solid",
    borderWidth: "6px 6px 0 6px",
    borderColor: "#FFFFFF transparent transparent transparent",
    transform: "rotate(0deg)",
    content: '""',
  },
});

const baseStyleToolbar = defineStyle({
  display: "flex",
  alignItems: "center",
  backgroundColor: "primary.50",
  padding: 1,
});

const baseStyle = definePartsStyle({
  button: baseStyleButton,
  content: baseStyleContent,
  debugger: baseStyleDebugger,
  divider: baseStyleDivider,
  editable: baseStyleEditable,
  editor: baseStyleEditor,
  linkPopover: baseStyleLinkPopover,
  placeholder: baseStylePlaceholder,
  popover: baseStylePopover,
  toolbar: baseStyleToolbar,
});

export const EditorTheme = defineMultiStyleConfig({
  baseStyle,
});
