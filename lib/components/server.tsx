import { Fragment } from 'react'

import { fromMarkdown, type ItemType } from '../from-markdown'
import { TOCProvider, Link, type ScrollAlign } from './client'

export interface TOCProps {
  markdown: string
  className?: string
  scrollAlign?: ScrollAlign
  throttleTime?: number
  ul?: string
  ol?: string
  li?: string
  a?: string
}

export function TOC(props: TOCProps) {
  const { markdown, className, ul, ol, li, a, scrollAlign = 'center', throttleTime } = props
  const [toc, keyMap] = fromMarkdown(markdown)

  function render(item: ItemType) {
    switch (item.type) {
      case 'list': {
        const ListType = item.ordered ? 'ol' : 'ul'
        const className = item.ordered ? ol : ul
        return (
          <ListType key={item.key} className={className}>
            {item.children.map(render)}
          </ListType>
        )
      }
      case 'listItem':
        return (
          <li key={item.key} className={li}>
            {item.children.map(child => render(child as ItemType))}
          </li>
        )
      case 'paragraph':
        return (
          <Fragment key={item.key}>
            {item.children.map(child => render(child as ItemType))}
          </Fragment>
        )
      case 'link':
        return (
          <Link
            scrollAlign={scrollAlign}
            key={item.key}
            activeKey={item.key}
            href={item.url}
            className={a}
          >
            {item.children.map(child => render(child as ItemType))}
          </Link>
        )
      case 'text':
      case 'inlineCode':
        return item.value
      default:
        return (
          <Fragment key={item.key}>
            {item.children.map(child => render(child as ItemType))}
          </Fragment>
        )
    }
  }

  return (
    <TOCProvider scrollAlign={scrollAlign} throttleTime={throttleTime} keyMap={keyMap}>
      <ul className={className}>{toc.map?.children.map(render)}</ul>
    </TOCProvider>
  )
}
