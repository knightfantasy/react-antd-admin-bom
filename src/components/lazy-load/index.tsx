import { Suspense } from 'react'
import { CircleLoading } from '@/components/loading'

function lazyLoad(Component: React.LazyExoticComponent<() => JSX.Element>): React.ReactNode {
  return (
    <Suspense fallback={<CircleLoading />}>
      <Component />
    </Suspense>
  )
}

export default lazyLoad
