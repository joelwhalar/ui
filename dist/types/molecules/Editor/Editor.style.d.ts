declare module "@chakra-ui/styled-system";
export declare const EditorTheme: {
    baseStyle?: {
        button: {
            display: string;
            alignItems: string;
            justifyContent: string;
            width: number;
            height: number;
            borderRadius: string;
            color: string;
            ":hover": {
                backgroundColor: string;
            };
            ":active": {
                backgroundColor: string;
            };
            svg: {
                color: string;
            };
        };
        content: {
            position: string;
        };
        debugger: {
            background: string;
            color: string;
            display: string;
            fontSize: string;
            lineHeight: string;
            maxHeight: string;
            overflow: string;
            padding: number;
            position: string;
            whiteSpace: string;
        };
        divider: {
            position: string;
            width: number;
            height: number;
            "::before": {
                position: string;
                top: string;
                left: string;
                transform: string;
                display: string;
                width: string;
                height: number;
                backgroundColor: string;
                content: string;
            };
        };
        editable: {
            minHeight: string;
            resize: string;
            fontSize: string;
            position: string;
            tabSize: number;
            outline: number;
            paddingX: number;
            a: {
                color: string;
                textDecoration: string;
            };
            p: {
                marginY: number;
            };
            "ul, ol": {
                marginLeft: number;
            };
        };
        editor: {
            [x: string]: string | number | {
                borderColor: string;
                boxShadow: string;
            };
            overflow: string;
            width: string;
            borderColor: string;
            borderWidth: number;
            borderStyle: string;
            borderRadius: string;
            ":focus-within": {
                borderColor: string;
                boxShadow: string;
            };
        };
        linkPopover: {
            display: string;
            alignItems: string;
            paddingX: number;
            input: {
                flex: number;
                height: number;
                paddingX: number;
                color: string;
                fontWeight: number;
                "&:focus": {
                    outline: string;
                };
            };
        };
        placeholder: {
            position: string;
            top: number;
            left: number;
            paddingX: number;
            color: string;
            fontSize: string;
            pointerEvents: string;
        };
        popover: {
            position: string;
            zIndex: number;
            top: string;
            left: string;
            maxWidth: string;
            height: number;
            width: string;
            opacity: number;
            marginTop: string;
            backgroundColor: string;
            boxShadow: string;
            borderRadius: string;
            "&[data-placement=\"top-start\"]::before": {
                position: string;
                top: string;
                left: number;
                width: string;
                height: string;
                borderStyle: string;
                borderWidth: string;
                borderColor: string;
                transform: string;
                content: string;
            };
        };
        toolbar: {
            display: string;
            alignItems: string;
            backgroundColor: string;
            padding: number;
        };
    } | undefined;
    sizes?: {
        [key: string]: import("@chakra-ui/styled-system").PartsStyleInterpolation<{
            keys: ("button" | "content" | "debugger" | "divider" | "editable" | "editor" | "linkPopover" | "placeholder" | "popover" | "toolbar")[];
        }>;
    } | undefined;
    variants?: {
        [key: string]: import("@chakra-ui/styled-system").PartsStyleInterpolation<{
            keys: ("button" | "content" | "debugger" | "divider" | "editable" | "editor" | "linkPopover" | "placeholder" | "popover" | "toolbar")[];
        }>;
    } | undefined;
    defaultProps?: {
        size?: string | number | undefined;
        variant?: string | number | undefined;
        colorScheme?: string | undefined;
    } | undefined;
    parts: ("button" | "content" | "debugger" | "divider" | "editable" | "editor" | "linkPopover" | "placeholder" | "popover" | "toolbar")[];
};
