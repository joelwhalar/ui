export const defaultTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

export const defaultThemeStyle = {
  h1: {
    fontSize: "24px",
    color: "#333",
  },
  ".ltr": {
    textAlign: "left",
  },
  ".rtl": {
    textAlign: "right",
  },
  ".editor-text-bold": {
    fontWeight: "bold",
  },
  ".editor-text-italic": {
    fontStyle: "italic",
  },
  ".editor-text-underline": {
    textDecoration: "underline",
  },
  ".editor-text-strikethrough": {
    textDecoration: "line-through",
  },
  ".editor-text-underlineStrikethrough": {
    textDecoration: "underline line-through",
  },
  ".editor-text-code": {
    backgroundColor: "rgb(240, 242, 245)",
    padding: "1px 0.25rem",
    fontFamily: "Menlo, Consolas, Monaco, monospace",
    fontSize: "94%",
  },
  ".editor-code": {
    backgroundColor: "rgb(240, 242, 245)",
    fontFamily: "Menlo, Consolas, Monaco, monospace",
    display: "block",
    padding: "8px 8px 8px 52px",
    lineHeight: "1.53",
    fontSize: "13px",
    margin: "0",
    marginTop: "8px",
    marginBottom: "8px",
    tabSize: "2",
    overflowX: "auto",
    position: "relative",
  },
  ".editor-code:before": {
    content: "attr(data-gutter)",
    position: "absolute",
    backgroundColor: "#eee",
    left: "0",
    top: "0",
    borderRight: "1px solid #ccc",
    padding: "8px",
    color: "#777",
    whiteSpace: "pre-wrap",
    textAlign: "right",
    minWidth: "25px",
  },
  ".editor-code:after": {
    content: "attr(data-highlight-language)",
    top: "0",
    right: "3px",
    padding: "3px",
    fontSize: "10px",
    textTransform: "uppercase",
    position: "absolute",
    color: "rgba(0, 0, 0, 0.5)",
  },
  ".editor-tokenComment": {
    color: "slategray",
  },
  ".editor-tokenPunctuation": {
    color: "#999",
  },
  ".editor-tokenProperty": {
    color: "#905",
  },
  ".editor-tokenSelector": {
    color: "#690",
  },
  ".editor-tokenOperator": {
    color: "#9a6e3a",
  },
  ".editor-tokenAttr": {
    color: "#07a",
  },
  ".editor-tokenVariable": {
    color: "#e90",
  },
  ".editor-tokenFunction": {
    color: "#dd4a68",
  },
  ".editor-paragraph": {
    position: "relative",
  },
  ".editor-paragraph:last-child": {},
  ".editor-heading-h1": {
    fontSize: "24px",
    color: "rgb(5, 5, 5)",
    fontWeight: "400",
    margin: "0",
    marginBottom: "12px",
    padding: "0",
  },
  ".editor-heading-h2": {
    fontSize: "15px",
    color: "rgb(101, 103, 107)",
    fontWeight: "700",
    margin: "0",
    marginTop: "10px",
    padding: "0",
    textTransform: "uppercase",
  },
  ".editor-quote": {
    margin: "0",
    marginLeft: "20px",
    fontSize: "15px",
    color: "rgb(101, 103, 107)",
    borderLeftColor: "rgb(206, 208, 212)",
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
    paddingLeft: "16px",
  },
  ".editor-list-ol": {
    padding: "0",
    margin: "0",
    marginLeft: "16px",
  },
  ".editor-list-ul": {
    padding: "0",
    margin: "0",
    marginLeft: "16px",
  },
  ".editor-listitem": {
    margin: "8px 32px 8px 32px",
  },
  ".editor-nested-listitem": {
    listStyleType: "none",
  },
  "pre::-webkit-scrollbar": {
    background: "transparent",
    width: "10px",
  },
  "pre::-webkit-scrollbar-thumb": {
    background: "#999",
  },
};
