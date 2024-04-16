# react-markdown-toc

`react-markdown-toc` is a library designed for React applications, focused on generating a Table of Contents (TOC) from Markdown text.

[Preview Link](https://zhangyu1818.github.io/react-markdown-toc/)

## Features

- **Fast and Accurate**: Optimized for runtime performance, ensuring quick and accurate identification of the currently active section in the document. This feature is particularly beneficial for interactive documents where users might scroll frequently.
- **Fully Customizable**: Supports a wide range of customization options, including list style and link behavior, suitable for various design needs.
- **Server and Client Side Support**: Compatible with React server components and client components, enabling it to adapt to different rendering strategies.

## Installation

You can install `react-markdown-toc` using the following commands:

```bash
npm install react-markdown-toc
```

## Usage

### fromMarkdown

The `fromMarkdown` function is used to generate a TOC tree from a Markdown text.

**Example Usage:**

```js
import { fromMarkdown } from 'react-markdown-toc'

const [result, map] = fromMarkdown(`## Heading 1\n\n### Heading 1.1\n\n## Heading 2`)
```

The `fromMarkdown` function returns a tuple containing the TOC tree and a map linking IDs to keys within the tree.

### Server Component

The server component does not support custom rendering functions; it renders the ul, li, and a tags in a fixed manner.

**Example Usage:**

```jsx
import fs from 'node:fs/promises'
import { TOC } from 'react-markdown-toc/server'

async function App() {
  const markdown = await fs.readFile('.example.md', 'utf-8')
  return <TOC markdown={markdown} className='ml-4' ul='pl-4' />
}
```

#### Props

- `markdown`: `string`, `required`
  - The Markdown text to generate the TOC from.
- `className`: `string`, `optional`
  - Adds a custom class name to the outermost `<ul>` for style customization.
- `scrollAlign`: `start`|`center`|`end`, `optional`, default: `center`
  - Determines which TOC item is considered active based on the scroll position, especially useful when multiple headings are visible in the viewport simultaneously.
  - The options are `start` (the element closest to the top of the viewport), `center` (the element closest to the center of the viewport), and `end` (the element closest to the bottom of the viewport).
- `throttleTime`: `number`, `optional`, default: `1000`
  - Controls the throttling time for the scroll event to improve performance.

### Client Component

The client component allows full customization of rendering, including the functions for rendering the `list`, `list items`, and `links`.

**Example Usage:**

Use `shadcn/ui` to implement a collapsible TOC list.

[Preview Link](https://zhangyu1818.github.io/react-markdown-toc/)

```jsx
import { useRouter } from 'next/navigation'
import { TOC } from 'react-markdown-toc/client'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

function CustomTOC({ tocData }) {
  const router = useRouter()
  return (
    <TOC
      toc={toc}
      scrollAlign='start'
      renderList={children => (
        <CollapsibleContent className='pl-4 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up'>
          {children}
        </CollapsibleContent>
      )}
      renderListItem={(children, open) => <Collapsible open={open}>{children}</Collapsible>}
      renderLink={(children, href, active) => (
        <CollapsibleTrigger>
          <span
            data-active={active}
            role='button'
            onClick={() => {
              router.push(href, { scroll: false })
              const target = document.querySelector(href)
              target?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {children}
          </span>
        </CollapsibleTrigger>
      )}
    />
  )
}
```

#### Props

- `toc`: `readonly [Result, Map<string, string>]`, `required`
  - Obtained through the `fromMarkdown` method. This tuple contains the TOC tree and a map linking IDs to keys within the tree.
- `scrollAlign`: `start`|`center`|`end`, `optional`, default: `center`
  - Determines which TOC item is considered active based on the scroll position, especially useful when multiple headings are visible in the viewport simultaneously.
  - The options are `start` (the element closest to the top of the viewport), `center` (the element closest to the center of the viewport), and `end` (the element closest to the bottom of the viewport).
- `throttleTime`: `number`, `optional`, default: `1000`
  - Controls the throttling time for the scroll event to improve performance.
- `renderList`: `(children: React.ReactNode, active: boolean) => React.ReactNode`, `required`
  - A custom rendering function for the list component, providing full control over the list's appearance and behavior.
- `renderListItem`: `(children: React.ReactNode, active: boolean) => React.ReactNode`, `required`
  - A custom rendering function for each list item, allowing for individual customization of list items within the TOC.
- `renderLink`: `(children: React.ReactNode, url: string, active: boolean) => React.ReactNode`, `required`
  - A custom function for rendering links, where you can specify the content, the target URL, and the active state styling or behavior.

## Contribution

Contributions are always welcome!

## License

[MIT](LICENSE)
