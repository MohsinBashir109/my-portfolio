import { createContext, useContext } from 'react'

/** When false, landing hero defers stagger / rail visibility until the gate → iris intro finishes. */
export const LandingRevealReadyContext = createContext(true)

export function useLandingRevealReady(): boolean {
  return useContext(LandingRevealReadyContext)
}
