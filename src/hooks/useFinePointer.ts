import { useEffect, useState } from 'react'

/** False for coarse / touch-primary devices — skip cursor parallax */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return fine
}
