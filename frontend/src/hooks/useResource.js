import { useCallback, useEffect, useState } from 'react'

export function useResource(loader, dependencies = []) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null })

  const load = useCallback(async () => {
    setState((current) => ({ ...current, status: 'loading', error: null }))
    try {
      const data = await loader()
      setState({ status: 'success', data, error: null })
    } catch (error) {
      setState({ status: 'error', data: null, error })
    }
  }, dependencies)

  useEffect(() => {
    load()
  }, [load])

  return { ...state, reload: load }
}
