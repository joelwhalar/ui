import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';

export const enum EDITOR_VARIANT {
  advanced = 'advanced',
  default = 'default',
  link = 'link',
}

export const EDITOR_DETAULT_CONFIG = {
  nodes: [ListNode, ListItemNode, AutoLinkNode, LinkNode],
};

export const enum EDITOR_LINK_TARGET {
  blank = '_blank',
  self = '_self',
}

export const EDITOR_LINK_DEFAULT = {
  url: '',
  text: '',
  target: EDITOR_LINK_TARGET.self,
};

export const LOW_PRIORITY = 1;
