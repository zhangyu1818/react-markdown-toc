'use client'
import { useRouter } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { TOC, type TOCProps } from '../../lib/client'

interface TOCClientProps {
  toc: TOCProps['toc']
}

export function TOCClient(props: TOCClientProps) {
  const { toc } = props
  const router = useRouter()
  return (
    <TOC
      scrollAlign='start'
      throttleTime={100}
      toc={toc}
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
