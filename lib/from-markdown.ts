import { fromMarkdown as mdastFromMarkdown } from 'mdast-util-from-markdown'
import { toc, type Result } from 'mdast-util-toc'

import type {
  RootContent,
  List,
  ListItem,
  Paragraph,
  Link,
  Text,
  InlineCode,
  Strong,
  Emphasis,
} from 'mdast'

declare module 'mdast' {
  interface Node {
    key: string
  }
}

export type ItemType = List | ListItem | Paragraph | Link | Text | InlineCode | Strong | Emphasis

export function fromMarkdown(markdown: string): [Result, Map<string, string>] {
  const rootTree = mdastFromMarkdown(markdown)
  const result = toc(rootTree)

  const keyMap = new Map<string, string>()

  function addKey<T extends RootContent>(node: T, prefix = '') {
    node.key = prefix
    if (node.type === 'link') {
      keyMap.set(node.url, node.key)
    }
    if ('children' in node) {
      node.children.forEach((child, index) => {
        const currentIndex = index + 1
        addKey(child, prefix ? `${prefix}.${currentIndex}` : `${currentIndex}`)
      })
    }
  }

  if (result.map) {
    addKey(result.map)
  }
  return [result, keyMap] as const
}
