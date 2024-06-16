import { useMatches } from 'react-router-dom'

export function useMatchRoute() {
  const matches = useMatches()

  const lastMatch = matches.at(-1)!
  return {
    handle: lastMatch.handle as AuthRoute.RouteHandle,
    pathname: lastMatch.pathname,
    lastMatch,
  }
}
