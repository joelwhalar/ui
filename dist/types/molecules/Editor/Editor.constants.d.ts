import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
export declare const enum EDITOR_VARIANT {
    advanced = "advanced",
    default = "default",
    link = "link"
}
export declare const EDITOR_DETAULT_CONFIG: {
    nodes: (typeof ListNode | typeof ListItemNode | typeof LinkNode)[];
};
export declare const enum EDITOR_LINK_TARGET {
    blank = "_blank",
    self = "_self"
}
export declare const EDITOR_LINK_DEFAULT: {
    url: string;
    text: string;
    target: EDITOR_LINK_TARGET;
};
export declare const LOW_PRIORITY = 1;
