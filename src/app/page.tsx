import fs from 'node:fs/promises'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'

import { TOC as TOCServer } from '../../lib/server'
import { fromMarkdown } from '../../lib'
import { TOCClient } from './toc-client'

export default async function Page() {
  const markdown = await fs.readFile('./src/app/example.md', 'utf-8')
  const toc = fromMarkdown(markdown)
  return (
    <main className='flex items-start gap-6'>
      <article className='flex-1 overflow-clip'>
        <Markdown rehypePlugins={[rehypeSlug]}>{markdown}</Markdown>
      </article>
      <div className='sticky top-0 flex-grow-0 w-[200px] text-sm'>
        <p className='mb-4'>
          Client Component,
          <br /> Collapsible, <br />
          Scroll Align to Top
        </p>
        <TOCClient toc={toc} />
      </div>
      <div className='sticky top-0 w-fit flex-grow-0 text-sm'>
        <p className='mb-4'>
          Server Component, <br />
          Scroll Align to Center
        </p>
        <TOCServer markdown={markdown} throttleTime={100} ul='pl-4' />
      </div>
    </main>
  )
}
