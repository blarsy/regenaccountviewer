import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import type { AppProps } from 'next/app'

const defaultState = {
  connected: false
}
type AppState = [typeof defaultState, Dispatch<SetStateAction<{
  connected: boolean;
}>>]


const AppContext = createContext([defaultState, (_newState: any) => {}] as AppState);

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState({ connected: false })

  // Wrap the root component in an AppContext provider, so that any component may use
  // 'useAppContext' to access and modify an app-wide state
  return <AppContext.Provider value={[state, setState]}>
    <Component {...pageProps} />
  </AppContext.Provider>
}

export default MyApp

export function useAppContext() {
  return useContext(AppContext)
}